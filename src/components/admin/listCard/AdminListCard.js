import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWrench, faTrashAlt, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Loader from '../../loader/Loader'
import { getAllCard } from '../../../actions/cardActions'

//import { CATEGORY_DELETE_RESET } from '../../../constants/userConstants'

import AdminAddCard from './addNewCard/AdminAddCard'



import './AdminListCard.css'

const AdminListCard = (props) => {
    const dispatch = useDispatch()

    const [isAdd, setIsAdd] = useState(false)
    const [type, setType] = useState("")


    const allCard = useSelector((state) => state.allCard);
    var listCard = allCard.listCard;

    const createCard = useSelector(state => state.createCard)
    const {success } = createCard;

    // const { listCategories, loading, success, error } = allCategory

    // const createCategoryState = useSelector((state) => state.createCategory)
    // const { success: successCreate } = createCategoryState

    useEffect(() => {
        dispatch(getAllCard())
    }, [success])
    // useEffect(() => {
    //     dispatch(getAllCard())
    // }, [successCreate])

    const handleAdd = (type) => {
        setIsAdd(!isAdd)
        setType(type)
    }

    return (
        <>            <div className="bread-crump">
            <div>
                <button onClick={() => props.handleLazy("dashboard")}> Admin </button>
                <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
            </div>
            <div>
                <b className="cl-red">List card</b>
            </div>
        </div>
            <div className="list-category-container">
                {isAdd && <AdminAddCard type={type} handleClose={handleAdd} />}
                <h1 className="t-a-center">List card</h1>
                {/* <button className="m-r-32px btn-add" onClick={() => handleAdd("addCategory")}>Add category <FontAwesomeIcon icon={faPlus} /></button> */}
                {allCard.loading && <div className="loader_center_screen"><Loader /></div>}
                {listCard && listCard?.map((category, index) => (
                    <div key={category.path} className="list-wrap ">
                        <div className={"item_header a" + index}>
                            <h2 className="flex-1">{category.name}</h2>
                            <div className="wrap_button" >
                                <button className="btn btn-add-new" onClick={() => handleAdd(category.path)}>Add new</button>
                            </div>
                        </div>
                        <div className={"list-item a" + index}>
                            {category.children.map((card) => (
                                <div key={card.name}>
                                    <h3>{card.name}</h3>
                                    <img alt="" src={card.img} />
                                </div>

                            ))}
                        </div>
                    </div>
                    // <div className="wrap">
                    //     <div className="flex-row align-item-center jt-ct-sb" key={category.id}>
                    //         <div className="flex-column flex-2">
                    //             <span className=""><b>Category name: </b>{category.name}</span>
                    //             <img src={category.image} alt="category img" />
                    //         </div>
                    //         <div className="flex-1 flex-row jt-ct-sa">
                    //             <button className="btn-add" onClick={() => handleAdd(category.name)}>Add child  <FontAwesomeIcon icon={faPlus}/></button>
                    //             <button className="btn-update" onClick={() => handleUpdate(category.id,category.name,category.image)}>Update  <FontAwesomeIcon icon={faWrench}/></button>
                    //         </div>
                    //     </div>
                    //     <span><b>Children: </b></span>
                    //     {category.children && category.children.map((child) => (
                    //         <div className="flex-row m-l-32px align-item-center m-t-8px" key={child.id}>
                    //             <div className="flex-column flex-2">
                    //                 <span className=""><b>Category name: </b>{child.name}</span>
                    //                 <img src={child.image} alt="category img" />
                    //             </div>
                    //             <div className="flex-1 flex-row jt-ct-sa">
                    //                 <button className="btn-update" onClick={() => handleUpdate(child.id,child.name,child.image,category.name)}>Update <FontAwesomeIcon icon={faWrench}/></button>
                    //             </div>
                    //         </div>
                    //     ))}
                    // </div>

                ))}

            </div>
        </>
    )
}

export default AdminListCard
