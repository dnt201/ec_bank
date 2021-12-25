import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CARD_CHECK_PIN_RESET } from '../../constants/cardConstants'
import NumberFormat from "react-number-format";

import Loader from '../loader/Loader'
import {checkPin } from '../../actions/cardActions'
import {withdraw} from '../../actions/userActions'


import './FormRutTien.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'

const FormRutTien = (props) => {
    
    const dispatch = useDispatch();

    const [pin, setPin] = useState("");
    const [amountInput, setAmountInput] = useState("");

    const [step, setStep] = useState(1);

    const checkPinState = useSelector(state => state.checkPin)
    const withDraw = useSelector(state=>state.withdraw)
    console.log(withDraw)

    useEffect(() => {
        dispatch({ type: CARD_CHECK_PIN_RESET })
    }, [])

    useEffect(() => {
        if (checkPinState.success === true)
            setStep(2);
        else setStep(1);
    }, [checkPinState])
    const checkPinHandle = () => {
        if(pin ==="") alert ("Bạn quên nhập mã pin rùi!");
        else dispatch(checkPin(props.numberCard, pin))
    }
    const checkNext =()=> {
        if(amountInput === "") alert ("Vui lòng nhập số tiền muốn rút!")
        else setStep(3);
    }
    const handleWithdraw= () => {
        if(amountInput==="") setStep(2);
    
        else {
            console.log("dispatch","withdraw",props.numberCard,amountInput);
            dispatch(withdraw("withdraw",props.numberCard, parseInt(amountInput))) 
            setStep(4);
        }   
    }

    return (
        <div>
             <div className="form-popup">
            <div className="form-chuyen-tien-container">
                <h1 className="t-a-center">Transfer</h1>
                <h3 className="">Số thẻ: {props.numberCard}</h3>
                {step === 1 ?
                    <div className="w-100p">
                        {checkPinState.error && <i className="error-message">{checkPinState.error}</i>}
                        <div className="one_line m-b-8px m-t-8px">
                            <b className="m-r-8px">Nhập PIN: </b>
                            <input className="flex-1 input" type="password" placeholder="Nhập mã pin"
                                onChange={(e) => setPin(e.target.value)}
                            />
                        </div>
                        <button className="btn check" onClick={checkPinHandle}>Check <FontAwesomeIcon icon={faShieldAlt} /></button>
                    </div>
                    :
                    (step === 2 ?
                        <div>
                            <b>Nhập số tiền cần rút</b>
                            <NumberFormat className="input w-100p m-b-8px" placeholder="Ex: 1,000,000 đ"
                                required
                                onChange={(e) => setAmountInput(e.target.value.replace(/[,đ ]/g, ""))}
                                decimalScale={0}
                                thousandSeparator={true}
                                suffix=" đ"
                                value={amountInput}
                            />
                            <button className="btn check" onClick={checkNext}>Tiếp theo</button>
                        </div>
                        :
                        (step === 3 ? 
                        <div>
                            <i className="error-message">Vui lòng kiểm tra lại thông tin!</i><br/>
                            <b>Số tiền rút: </b>
                            <NumberFormat className="input w-100p m-b-8px"
                                disabled
                                decimalScale={0}
                                thousandSeparator={true}
                                suffix=" đ"
                                value={amountInput}
                            />
                            <button className="btn back" onClick={()=>setStep(2)}>Sửa</button>
                            <button className="btn check" onClick={handleWithdraw}>Rút</button>
                        </div>
                            :
                            (step === 4 ? 
                                <div>
                                    {withDraw.loading && <div className="loader_center_screen"><Loader/></div>}
                                    {withDraw.error && <i className="error-message">{withDraw.error}</i>} 
                                    {withDraw.success && withDraw.success ===true && 
                                        <i  className="error-message">Bạn đã rút thành công với số tiền {Intl.NumberFormat('de-DE').format(amountInput) + " đ"}</i>} 
                                </div>
                                :
                                <i className="error-message">Lỗi không xác định vui lòng thử lại!</i>)))

                }
                <button className="btn cancel" onClick={props.handleClose}> Close </button>
                {checkPinState.loading && <div className="loader-center-lazy"> <Loader /> </div>}
                <i className="error-message f-s-16px" >Chú ý quan sát và che thao tác khi nhập mật khẩu!</i><br />
            </div>
        </div>
        </div>
    )
}

export default FormRutTien
