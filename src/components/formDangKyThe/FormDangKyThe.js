import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Loader from '../loader/Loader'
import { registerCard, changePin } from '../../actions/userActions'

import { USER_REGISTER_CARD_RESET, USER_CHANGE_PIN_RESET } from '../../constants/userConstants'

import Card from '../card/Card'

import './FormDangKyThe.css'

const FormDangKyThe = (props) => {
    const dispatch = useDispatch()

    console.log(props)
    const [oldPin, setOldPin] = useState('')
    const [pin, setPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [message, setMessage] = useState("")


    const userLogin = useSelector(state => state.userLogin)
    const userRegisterCard = useSelector(state => state.userRegisterCard)
    const userUpdatePin = useSelector((state) => state.changePin)
    const { loading, error: updatePinError, success: updatePinSuccess } = userUpdatePin

    const { loading: registerLoading, error: registerError, info, success: registerCardSuccess } = userRegisterCard
    useEffect(() => {
        dispatch({ type: USER_REGISTER_CARD_RESET })
        dispatch({ type: USER_CHANGE_PIN_RESET })
        setMessage("");
    }, [])

    useEffect(() => {
        if (registerCardSuccess === true) {
            if(info?.selected?.CCV)
                setStep(2);
            setStep(1);
        }
        if (updatePinSuccess === true) {
            setStep(2);
        }
    }, [updatePinSuccess, registerCardSuccess])
    useEffect(() => {
        if (registerError) {
            setStep(0);
            setMessage(registerError)
        }
        if (updatePinError) {
            setStep(1);
            setMessage(updatePinError)
        }
    }, [registerError, updatePinError])


    console.log(props)

    const [step, setStep] = useState(0)

    return (
        <div className="form-popup">
            <div className="form-dang-ky-the-container">
                <button className="btn-close-lazy" onClick={props.handleClose}> <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
                <div className="card-wrap">
                    <Card type={props.card.type} image={props.card.category.image} name={userLogin?.userInfo?.name} />
                    {step === 0 ?
                        <div className="infor-wrap">
                            {registerLoading && <div className=""><Loader /></div>}
                            {registerError && <i className="error-message-password t-a-center">{registerError}</i>}
                            <i>Bạn muốn đăng ký dịch vụ của chúng tôi?</i>
                            <h2>{props.card.type}</h2>
                            <h3>{props.card.category.name}</h3>
                            <button onClick={() => {
                                dispatch(registerCard(props.card.type, props.card.category.name))
                            }}>Xác nhận <FontAwesomeIcon icon={faCheck} /></button>
                        </div>
                        : step === 1 ?
                            <div>
                                <h1 className="t-a-center">Đổi mã pin</h1>
                                <h6 className="t-a-center">Old pin is 000000 - bạn cần đổi mã pin để kích hoạt thẻ</h6>
                                {registerError && <i className="error-message-password t-a-center"><b>{message}</b></i>}
                                {loading && <div className=""><Loader /></div>}
                                <div class="flex">
                                    <b className="flex-1">Old Pin: </b>
                                    <input
                                        type="password"
                                        placeholder="Enter old Pin"
                                        name="oldPassWord"
                                        required
                                        value={oldPin}
                                        onChange={(e) => setOldPin(e.target.value.replace(/[^0-9]/g, ''))}
                                    />
                                </div>
                                <div class="flex">
                                    <b className="flex-1">New Pin: </b>
                                    <input
                                        type="password"
                                        placeholder="Enter New Pin"
                                        name="newPassWord"
                                        required
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                                    />
                                </div>
                                <div class="flex">
                                   <b className="flex-1">Confirm Pin: </b>
                                    <input
                                        type="password"
                                        placeholder="Confirm Pin"
                                        name="confirmPassWord"
                                        required
                                        value={confirmPin}
                                        onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, ''))}
                                    />
                                </div>
                                {userUpdatePin && <i className="error-message-password t-a-center"><b>{message}</b></i>}
                                <button type="button" className="btn m-t-8px"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (pin !== confirmPin) {
                                            setMessage('Passwords do not match')
                                        }
                                        else {
                                            setMessage('')
                                            console.log('dispatch action')
                                            dispatch(changePin(oldPin, pin, info?.selected?.CardNumber))
                                        }
                                    }}>Change</button>
                            </div>
                            : step === 2 ?
                                <div>Bạn đã đăng ký thành công dịch vụ của chúng tôi! Many thanks.</div>
                                : <i>Vui lòng thử lại, hệ thống đang quá tải.</i>
                    }
                </div>
            </div>
        </div >
    )
}

export default FormDangKyThe
