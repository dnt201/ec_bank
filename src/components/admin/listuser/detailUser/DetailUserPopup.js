import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment';
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faWrench } from '@fortawesome/free-solid-svg-icons'

import { getUserDetails } from '../../../../actions/userActions'
import { USER_UPDATE_RESET } from '../../../../constants/userConstants'
import { updateUser } from '../../../../actions/userActions'

import Loader from '../../../loader/Loader'


import './DetailUser.css'

const DetailUserPopup = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [role, setRole] = useState(null)
    const [job, setJob] = useState('');
    const [place, setPlace] = useState('');
    const [salary, setSalary] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [issueDate, setIssueDate] = useState(new Date());
    const [issuePlace, setIssuePlace] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isChange,setIsChange] = useState(true);

    const [message, setMessage] = useState()


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector((state) => state.userDetail)
    const { loading, error, user } = userDetails
    const userUpdate = useSelector((state) => state.userUpdate)
    console.log(user)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setRole(user?.role)
        setJob(user?.job?.['job'])
        setBirthday(user?.birthDay)
        setPlace(user?.job?.place)
        setSalary(user?.job?.salary)
        setIdNumber(user?.personalID?.IdNumber)
        setIssueDate(user?.personalID?.IssueDate)
        setIssuePlace(user?.personalID?.IssuePlace)
        setPhoneNumber(user?.phoneNumber)
        setAddress(user?.address)
    }, [user])

    useEffect(() => {
        if (userUpdate.error) {
            setMessage(userUpdate.error)
            setName(user.name)
        } else if (userUpdate.success) {
            setMessage("Update thành công!")
            dispatch(getUserDetails(props.id))
        }
    }, [userUpdate.error, userUpdate.success])

    useEffect(() => {
        dispatch({ type: USER_UPDATE_RESET })
        if (userInfo && userInfo.role === "admin") {
            dispatch(getUserDetails(props.id))
        }
    }, [])

    const onSubmitHandler = (e) => {
        setIsChange(!isChange)
        e.preventDefault()
        dispatch(updateUser(props.id, idNumber, issueDate, issuePlace, job, place, salary, name, birthday, phoneNumber, address, role))
    }

    return (
        <div className="form-detail-user">
            <div className="form-popup" id="myForm">
                <div className="form_container">
                    <form className="wrap-register">
                        <h1 className="t-a-center">Details user</h1>
                        {loading && <Loader/>}
                        {message && <i className="error-message-password">{message}</i>}
                        <h3 className="m-b-16px">User id: {props.id}</h3>
                        <div className="wrap_name_email flex_row_around w100 m-t-8px">
                            <div className="form_control wrap_name flex_column_start w48">
                                <label className="m-b-4px">Name</label>
                                <input id="nameInput"
                                    className="m-b-4px w100 p-lr-4px w100" placeholder="Enter your name..."
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isChange}
                                />
                            </div>
                            <div className="form_control wrap_email flex_column_start w48">
                                <label className="m-b-4px">Email</label>
                                <input id="emailInput" className="m-b-4px w100 p-lr-4px w100" type="email" placeholder="Enter your email address..."
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="wrap_name_email flex_row_around w100 m-t-8px">
                            <div className="form_control wrap_name flex_column_start w48">
                                <label className="m-b-4px">Birthday</label>
                                <DatePicker required
                                    selected={moment(birthday).isValid() ? moment(birthday).toDate() : null}
                                    onChange={(date) => setBirthday(date)}
                                    dateFormat="MM/dd/yyyy"
                                    maxDate={new Date()}
                                    disabled={isChange}
                                />
                            </div>
                            <div className="form_control wrap_email flex_column_start w48">
                                <label className="m-b-4px">PhoneNumber</label>
                                <input id="phoneNumber" className="m-b-4px w100 p-lr-4px w100" type="number" placeholder="Enter your email phone number..."
                                    value={phoneNumber}
                                    required
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    disabled={isChange}
                                />
                            </div>
                        </div>
                        <div className="job-perID m-b-8px">
                            <div className="">
                                <h2 className=" m-b-8px">Công việc</h2>
                                <div className="one_line m-b-4px">
                                    <label className="m-r-4px w-150px"><b>Job:</b></label>
                                    <input className="w-100p" placeholder="Ex: Student"
                                        required
                                        value={job}
                                        onChange={(e) => setJob(e.target.value)}
                                        disabled={isChange}
                                    >
                                    </input>
                                </div>
                                <div className="one_line w-140p m-b-4px">
                                    <label className="m-r-4px w-150px"><b>Địa chỉ:</b></label>
                                    <input className="w-100p" placeholder="Ex: Hcmute"
                                        required
                                        value={place}
                                        onChange={(e) => setPlace(e.target.value)}
                                        disabled={isChange}
                                    >
                                    </input>
                                </div>
                                <div className="one_line w-140p m-b-4px">
                                    <label className="m-r-4px w-150px"><b>Thu nhập:</b></label>
                                    <NumberFormat className="w-100p" placeholder="Ex: 0"
                                        required
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value.replace(/[,đ ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" đ"
                                        disabled={isChange}
                                    />

                                </div>
                            </div>
                            <div className="">
                                <h2 className="m-b-8px">CMND/CCCD</h2>
                                <div className="one_line w-140p m-b-4px">
                                    <label className="m-r-4px w-150px m-l-4px"><b>ID:</b></label>
                                    <input className="w-100p" placeholder="Ex: 0123456789"
                                        required
                                        value={idNumber}
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        disabled={isChange}
                                    >
                                    </input>
                                </div>
                                <div className="one_line w-140p m-b-4px">
                                    <label className="m-r-4px w-150px m-l-4px"><b>Nơi cấp:</b></label>
                                    <input className="w-100p" placeholder="Ex: Lâm Đồng"
                                        required
                                        value={issuePlace}
                                        onChange={(e) => setIssuePlace(e.target.value)}
                                        disabled={isChange}
                                    >
                                    </input>
                                </div>
                                <div className="one_line w-140p m-b-4px">
                                    <label className="m-r-4px w-150px m-l-4px"><b>Ngày cấp:</b></label>
                                    <DatePicker className="w-100p"
                                        required
                                        selected={moment(issueDate).isValid() ? moment(issueDate).toDate() : null}
                                        onChange={(date) => setIssueDate(date)}
                                        dateFormat="MM/dd/yyyy"
                                        maxDate={new Date()}
                                        disabled={isChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form_control wrap_address flex_column_start w100">
                            <label className="m-b-4px">Address</label>
                            <input id="addressInput" className="w100 m-b-4px p-lr-4px" type="text" placeholder="Enter your address..."
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={isChange}
                            />
                        </div>
                        <div className="item w100  m-b-8px">
                            <label className="m-b-4px">Role: </label>
                            <div className="flex-3">
                                <input
                                    type="radio"
                                    value="user"
                                    name="role"
                                    className="role  m-r-4px"
                                    id="userChoice"
                                    checked={role === "user"}
                                    onChange={(e)=> setRole(e.target.value)}
                                    disabled={isChange}
                                />
                                <label htmlFor="userChoice" className="role  m-r-8px">User</label>

                                <input
                                    type="radio"
                                    value="admin"
                                    id="adminChoice"
                                    name="role"
                                    className="role m-r-4px"
                                    checked={role === "admin"}
                                    onChange={(e)=> setRole(e.target.value)}
                                    disabled={isChange}
                                />
                                <label htmlFor="adminChoice">Admin</label>
                            </div>
                        </div>
                        <div className="wrap-btn">
                            <button className="btn btn-change flex-1" onClick={()=> setIsChange(!isChange)}  disabled={!isChange}>Sửa <FontAwesomeIcon icon={faWrench} /> </button>
                            <button className="btn btn-save flex-1" onClick={(e)=> onSubmitHandler(e)}  disabled={isChange}>Save <FontAwesomeIcon icon={faCheck} /> </button>
                        </div>
                        <button className="btn-lazyzyzy" onClick={props.handleClose} ><FontAwesomeIcon icon={faTimes} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DetailUserPopup
