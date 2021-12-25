import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from "react-number-format";
import ButtonWrapper from "../paypal/ButtonWrapper"
import Loader from "../loader/Loader"

import {getRates} from '../../actions/cardActions'
import {
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";



import './FormNapTien.css'
import { faCoins } from '@fortawesome/free-solid-svg-icons';

const FormNapTien = (props) => {
    const dispatch = useDispatch();

    const [amountInput, setAmountInput] = useState("");
    const [step, setStep] = useState(1);

    useEffect(()=>{
        dispatch(getRates("VND"))
    },[])

    const addMoney = useSelector(state => state.addMoney)
    const rates = useSelector(state => state.getRates)
    console.log(rates)
    const handleClick = () => {
        if (amountInput === "" || amountInput === null || amountInput === undefined || amountInput <= 0)
            alert("Số tiền không hợp lệ!");
        else if (isNaN(amountInput)) alert("Số tiền không hợp lệ!");
        else if (!rates) alert("lỗi bất định, vui lòng thử lại");
        else{
            // console.log(parseFloat(amountInput)/parseFloat(rates.rates))
            setAmountInput(parseFloat(parseFloat(amountInput)/parseFloat(rates.rates)).toFixed(2))
            setStep(2);  
        }
    }
    return (
        <div className="form-popup">
            <div className="form-nap-tien-container">
                <h1 className="t-a-center">NDTH Bank</h1>
                <h3 className="t-a-center m-b-8px">Nạp tiền: {props.numberCard}</h3>
                {step === 1 ? <> <b className="f-s-16px">Số tiền muốn nạp: </b>
                    <NumberFormat className="w-100p input-money f-s-16px" placeholder="Ex: 1,000 đ"
                        required
                        onChange={(e) => setAmountInput(e.target.value.replace(/[,đ ]/g, ""))}
                        decimalScale={0}
                        thousandSeparator={true}
                        suffix=" đ"
                    />
                    <button className="btn nap f-s-16px" onClick={handleClick}>Nạp thôi chán quá rùi. <FontAwesomeIcon icon={faCoins}/></button></>
                    : (step === 2 ?
                        <div style={{ layout: "horizontal" }}>
                            <h4><i>Số tiền: {amountInput} usd</i></h4>
                            <div className="abcdefg">
                            <PayPalScriptProvider
                                options={{
                                    "client-id":`${process.env.REACT_APP_CLIENT_ID}`,
                                    components: "buttons",
                                    currency: "USD"
                                }}
                            >
                                <ButtonWrapper
                                    amount={amountInput}
                                    idthe={props.numberCard}
                                    showSpinner={false}
                                    setStep={setStep}
                                />
                            </PayPalScriptProvider>
                            </div>
                        </div>
                        : (step === 3 ?
                            (addMoney.loading ? <div className="loader-center-lazy"><Loader/></div> : (addMoney?.success === true ? <div className="thongbao-lazy"> Nạp tiền thành công.</div> : addMoney.error && <span  className="thongbao-lazy">{addMoney.error}</span>))
                            : null
                        ))

                }
                <button className="btn cancel f-s-16px" onClick={props.handleClose}> Close </button>
            </div>
        </div>
    )
}


export default FormNapTien
