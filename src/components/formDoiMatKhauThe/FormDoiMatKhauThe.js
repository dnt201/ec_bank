import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { changePin } from '../../actions/userActions'
import Loader from '../loader/Loader'
import { USER_CHANGE_PIN_RESET } from '../../constants/userConstants'

const FormDoiMatKhauThe = (props) => {
    const dispatch = useDispatch()

    const [oldPin, setOldPin] = useState('')
    const [pin, setPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [message, setMessage] = useState(null)

    console.log(pin, confirmPin, oldPin)


    const userUpdatePin = useSelector((state) => state.changePin)
    const { loading, error, success } = userUpdatePin

    useEffect(() => {
        dispatch({ type: USER_CHANGE_PIN_RESET })
    }, [])

    useEffect(() => {
        if (userUpdatePin) {
            if (success) {
                setMessage("Pin was changed!")
            }
            else if (error) {
                setMessage(error)
            }
            else {
                setMessage("")
                setOldPin("")
                setPin("")
            } setConfirmPin("")
        }
    }, [userUpdatePin, error, success])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (pin !== confirmPin) {
            setMessage('Passwords do not match')
        } else {
            setMessage('')
            console.log('dispatch action')
            dispatch(changePin(oldPin, pin, props.bankAccount))
        }
    }
    return (
        <div className="form-popup">
            <div className="form-change-pin-container">
                <form className="form-container" onSubmit={onSubmitHandler}>
                    <h1 className="form-container_header">Đổi mã pin</h1>
                    <h2 className="t-a-center">{props.bankAccount}</h2>
                    {loading && <div className=""><Loader /></div>}
                    <div>
                        <label htmlFor="oldPassWord"><b>Old Pin</b></label>
                        <input
                            type="password"
                            placeholder="Enter old PassWord"
                            name="oldPassWord"
                            required
                            value={oldPin}
                            onChange={(e) => setOldPin(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassWord"><b>New Pin</b></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="newPassWord"
                            required
                            value={pin}
                            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassWord"><b>Confirm Pin</b></label>
                        <input
                            type="password"
                            placeholder="Confirm PassWord"
                            name="confirmPassWord"
                            required
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                    </div>
                    {userUpdatePin && <i className="error-message-password t-a-center"><b>{message}</b></i>}

                    <button type="submit" className="btn m-t-8px" >Change</button>
                    <button className="btn cancel" onClick={props.handleClose} >Close</button>
                </form>
            </div>
        </div>
    )
}

export default FormDoiMatKhauThe
