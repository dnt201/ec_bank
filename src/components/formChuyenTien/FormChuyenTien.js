import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CARD_CHECK_PIN_RESET } from '../../constants/cardConstants'
import NumberFormat from "react-number-format";

import Loader from '../loader/Loader'
import { checkPin } from '../../actions/cardActions'
import {transfer} from '../../actions/userActions'

import './FormChuyenTien.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'

const FormChuyenTien = (props) => {
    const dispatch = useDispatch();

    const [pin, setPin] = useState("");
    const [toAccount, setToAccout] = useState("");
    const [amountInput, setAmountInput] = useState("");

    const [step, setStep] = useState(1);

    const checkPinState = useSelector(state => state.checkPin)
    const transferState = useSelector(state=>state.transfer)
    console.log(transferState)

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
        if(toAccount === "") alert ("Vui lòng nhập tài khoản thụ hưởng!")
        else if(amountInput ==="") alert ("Vui lòng nhập số tiền muốn chuyển!")
        else setStep(3);
    }
    const handleTransfer= () => {
        if(toAccount === "" || amountInput==="") setStep(2);
       
        else {
            console.log("dispatch","transfer",props.numberCard,amountInput,toAccount);
            dispatch(transfer("transfer",props.numberCard, parseInt(amountInput),toAccount)) 
            setStep(4);
        } 
    }
    return (
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
                            <b>Nhập số tài khoản thụ hưởng: </b>
                            <input className="input w-100p" type="number" placeholder="Số tài khoản thụ hưởng"
                                required
                                onChange={(e) => setToAccout(e.target.value)}
                                value={toAccount}
                            />
                            <b>Nhập số tiền cần chuyển</b>
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
                            <i className="error-message">Vui lòng kiểm tra lại thông tin chuyển khoản!</i><br/>
                            <b>Số tài khoản thụ hưởng: </b>
                            <input className="input w-100p" type="number" placeholder="Số tài khoản thụ hưởng"
                                disabled
                                value={toAccount}
                            />
                            <b>Số tiền chuyển khoản: </b>
                            <NumberFormat className="input w-100p m-b-8px"
                                disabled
                                decimalScale={0}
                                thousandSeparator={true}
                                suffix=" đ"
                                value={amountInput}
                            />
                            <button className="btn back" onClick={()=>setStep(2)}>Sửa</button>
                            <button className="btn check" onClick={handleTransfer}>Chuyển</button>
                        </div>
                            :
                            (step === 4 ? 
                                <div>
                                    {transferState.error && <i className="error-message">{transferState.error}</i>} 
                                    {transferState.loading && <div className="loader_center_screen"><Loader/></div>}
                                    {transferState.success && transferState.success ===true && 
                                        <i  className="error-message">Bạn đã chuyển thành công với số tiền {amountInput} và tài khoản thụ hưởng là {toAccount}</i>} 
                                </div>
                                :
                                <i className="error-message">Lỗi không xác định vui lòng thử lại!</i>)))

                }
                <button className="btn cancel" onClick={props.handleClose}> Close </button>
                {checkPinState.loading && <div className="loader-center-lazy"> <Loader /> </div>}
                <i className="error-message f-s-16px" >Chú ý quan sát và che thao tác khi nhập mật khẩu!</i><br />
            </div>
        </div>
    )
}

export default FormChuyenTien
