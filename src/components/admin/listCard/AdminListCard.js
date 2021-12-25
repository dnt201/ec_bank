import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Loader from '../../loader/Loader'
import { getAllCard, getAllCardLeft, getCardLeft,generateCard } from '../../../actions/cardActions'

import { GENERATE_CARD_RESET } from '../../../constants/cardConstants'

import AdminAddCard from './addNewCard/AdminAddCard'

import './AdminListCard.css'

const AdminListCard = (props) => {
    const dispatch = useDispatch()

    const [isAdd, setIsAdd] = useState(false)
    const [type, setType] = useState("")
    const [dis, setDis] = useState(false)
    const [amount,setAmount]=useState("0")
    const [mess,setMess]=useState("")

    const [details, setDetails] = useState(false)

    const allCard = useSelector((state) => state.allCard);
    var listCard = allCard.listCard;

    const createCard = useSelector(state => state.createCard)
    const { success } = createCard;

    const allCardLeft = useSelector((state) => state.getAllCardLeft)
    const cardLeft = useSelector((state) => state.getCardLeft)

    const generateCardState = useSelector((state) => state.generateCard)
    console.log(generateCardState)

    useEffect(() => {
        dispatch(getAllCard())
        dispatch(getAllCardLeft())
        dispatch({type: GENERATE_CARD_RESET})
        setMess("")
    }, [success])

    useEffect(() => {
        if(generateCardState.success)
            setMess("Sinh thành công!")
        if (type === "") {
        }
        else dispatch(getCardLeft(type))
        
    }, [dis,generateCardState.success])


    const handleAdd = (type) => {
        setIsAdd(!isAdd)
        setType(type)
    }

    const handleGenerate = (name)=>{
        if(!parseInt(amount)){
            alert("Số lượng không hợp lệ");
        }
        else if (parseInt(amount)<=0){
            alert("Số lượng không được âm");
        }
        else {
            dispatch(generateCard(type,name,amount));
        }
    }

    return (
        <> {details === false ? <>
            <div className="bread-crump">
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
                {(allCard.loading || allCardLeft.loading) ? <div className="loader_center_screen"><Loader /></div> :
                    <>
                        {listCard && listCard?.map((category, index) => (
                            <div key={index} className="list-wrap ">
                                <div className={"item_header a" + index}>
                                    <h2 className="flex-1">{category.name}
                                        {index === 0 ? <i>{" (" + allCardLeft?.data?.numberofCard?.[1].GlobalDebitCard + ")"}</i> :
                                            index === 1 ? <i>{" " + allCardLeft?.data?.numberofCard?.[2].GlobalCreditCard + ")"}</i> :
                                                index === 2 ? <i>{" " + allCardLeft?.data?.numberofCard?.[0].LocalDebitCard + ")"}</i> :
                                                    null
                                        }</h2>
                                    <div className="wrap_button" >
                                        <button className="btn btn-details m-r-4px" onClick={() => { setDetails(!details); setType(category.path); setDis(!dis) }} >Details</button>
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

                        ))}
                    </>}

            </div>
        </>
            :
            <>
                <div className="bread-crump">
                    <div>
                        <button onClick={() => props.handleLazy("dashboard")}> Admin </button>
                        <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
                    </div>
                    <div>
                        <button onClick={() => setDetails(!details)}> List card</button>
                        <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
                    </div>
                    <div>
                        <b className="cl-red">Details {type}</b>
                    </div>
                </div>
                {cardLeft.loading||generateCardState.loading ? <div className="loader_center_screen"><Loader /></div> :
                    <div className="m-b-32px">
                        <h1 className="t-a-center">List card {type}</h1>
                        {mess && <h5 className="error-message-password w-100p t-a-center">{mess}</h5>}
                        <div className="list-card-container">
                            {cardLeft && cardLeft.data && cardLeft.data.CardLeft.map((item)=>(
                                <div key={item.name} className="card-item-container">
                                    <div class="item_header">
                                        <h2 className="m-r-8px">{item.name}</h2>
                                        <button onClick={()=>{handleGenerate(item.name)}}>Generate</button>
                                        <input type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)}/>
                                    </div>
                                    {item.value.map((child,index) =>(
                                        <div key={index}> 
                                            <span >{child}</span> 
                                            <br/>
                                        </div>
                                    ))}
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </>
        }
        </>
    )
}

export default AdminListCard
