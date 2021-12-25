import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faTrashAlt, faChevronRight, faEye } from '@fortawesome/free-solid-svg-icons'

import DetailUserPopup from './detailUser/DetailUserPopup'
import { USER_UPDATE_RESET,USER_DELETE_RESET } from '../../../constants/userConstants'
import Loader from '../../loader/Loader'

import { all_user, logout,deleteUser } from '../../../actions/userActions'

import "./AdminListUser.css"
const AdminListUser = (props) => {
    const dispatch = useDispatch()

    const [clickedID, setClickedID] = useState("")
    const [showDetailUserPopup, setShowDetailUserPopup] = useState(false)


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDelete = useSelector((state) => state.userDelete)
    const {loading: loadingDelete, success: successDelete} = userDelete
    const userUpdate = useSelector((state) => state.userUpdate)
    const { success: successUpdate} = userUpdate

    const userListState = useSelector((state) => state.listUser)

    useEffect(() => {
        if (userInfo && userInfo.role === "admin") {
            dispatch(all_user())
        } else {
            dispatch(logout())
        }
        if(successDelete){
            alert("Xóa thành công")
            dispatch({type:USER_DELETE_RESET})
        }
    }, [dispatch, userInfo,successUpdate, successDelete])





    const detailHandler = (id) => {
        setShowDetailUserPopup(!showDetailUserPopup);
        console.log("detailHandler " + showDetailUserPopup)
        setClickedID(id);
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure delete user: ' + id)) {
            dispatch(deleteUser(id))
        }
        
    }


    return (
        <>
           
            {showDetailUserPopup && <DetailUserPopup id={clickedID} handleClose={detailHandler} />}
            {(false || userListState?.loading||loadingDelete) ? <div className="center-screen loader" ><Loader /> </div>
                : <div className="admin-ListUser">
                    <div className="bread-crump">
                        <div>
                            <button onClick={() => props.handleLazy("dashboard")}> Admin </button>
                            <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
                        </div>
                        <div>
                            <b className="cl-red">List user</b>
                        </div>
                    </div>
                    <h2 className="w-100p t-a-center m-b-8px m-t-8px">List user</h2>
                    
                    <table className="" id="userDatatable">
                        <colgroup>
                            <col span="1" style={{ width: '35%' }} />
                            <col span="1" style={{ width: '25%' }} />
                            <col span="1" style={{ width: '20%' }} />
                            <col span="1" style={{ width: '10%' }} />
                            <col span="1" style={{ width: '10%' }} />
                            <col span="1" style={{ width: '15%' }} />
                        </colgroup>
                        
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th className="t-a-center">Role</th>
                                <th className="t-a-center">Active</th>
                                <th className="t-a-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userListState?.listUser?.length > 0  && userListState?.listUser?.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td className="t-a-center">{user.role}</td>
                                    <td className="t-a-center">{user.isActivate === 1 ? 
                                        <FontAwesomeIcon className="icon-check" icon={faCheck} /> 
                                        : 
                                        <FontAwesomeIcon className="icon-no" icon={faTimes} />}
                                    </td>
                                    <td className="t-a-center">
                                        <button className="btn btn-detail" onClick={()=>detailHandler(user._id)}><FontAwesomeIcon icon={faEye}/> </button>
                                        {user.isActivate === 1 ?  
                                            <button className="btn btn-delete" disabled={true} ><FontAwesomeIcon icon={faTrashAlt}/></button>
                                            :
                                            <button className="btn btn-delete" onClick={()=>deleteHandler(user._id)}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        }
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>      
                    {userListState.loading && <div className="loader_center_screen"><Loader/></div>}
                </div>
            }
        </>
    )
}

export default AdminListUser
