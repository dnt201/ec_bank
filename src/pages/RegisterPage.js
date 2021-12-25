import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";

import { register } from '../actions/userActions'
import Loader from '../components/loader/Loader'
import SendEmail from '../components/sendEmail/SendEmail'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'

const RegisterPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, userInfo, error } = userRegister

    const userLogin = useSelector((state) => state.userLogin)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [job, setJob] = useState('');
    const [place, setPlace] = useState('');
    const [salary, setSalary] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [issueDate, setIssueDate] = useState(new Date());
    const [issuePlace, setIssuePlace] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState()

    useEffect(() => {
        if (userLogin.userInfo) {
            navigate('/user');
        }
    }, [])
    useEffect(() => {
        if(error) {
            setMessage(error)
        }   
    },[error])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password not match!");
        }
        else {
            setMessage("")
            dispatch(register(name, email, password,birthday,idNumber,issueDate,issuePlace,job,place,salary,phoneNumber,address))
        }
    }   
    console.log(name, email, password,birthday,idNumber,issueDate,issuePlace,job,place,salary,phoneNumber,address)
    return (
        <> {userInfo && !userInfo.isActivate ? <SendEmail /> :
            <div className="form_container">
                <form className="wrap-register" onSubmit={submitHandler}>
                    <span >Register</span>
                    <p><i>Many thanks for your registration!</i></p>

                    <div className="wrap_name_email flex_row_around w100 m-t-8px">
                        <div className="form_control wrap_name flex_column_start w48">
                            <label className="m-b-4px">Name</label>
                            <input id="nameInput"
                                className="m-b-4px w100 p-lr-4px w100" placeholder="Enter your name..."
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form_control wrap_email flex_column_start w48">
                            <label className="m-b-4px">Email</label>
                            <input id="emailInput" className="m-b-4px w100 p-lr-4px w100" type="email" placeholder="Enter your email address..."
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}

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
                            />
                        </div>
                        <div className="form_control wrap_email flex_column_start w48">
                            <label className="m-b-4px">PhoneNumber</label>
                            <input id="phoneNumber" className="m-b-4px w100 p-lr-4px w100" type="number" placeholder="Enter your email phone number..."
                                value={phoneNumber}
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                    onChange={(e) => setJob(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="one_line w-140p m-b-4px">
                                <label className="m-r-4px w-150px"><b>Địa chỉ:</b></label>
                                <input className="w-100p" placeholder="Ex: Hcmute"
                                    required
                                    onChange={(e) => setPlace(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="one_line w-140p m-b-4px">
                                <label className="m-r-4px w-150px"><b>Thu nhập:</b></label>
                                <NumberFormat  className="w-100p" placeholder="Ex: 0"
                                    required
                                    onChange={(e) => setSalary(e.target.value.replace(/[,đ ]/g, ""))}
                                    decimalScale={0}
                                    thousandSeparator={true}
                                    suffix=" đ"
                                />
                                    
                            </div>
                        </div>
                        <div className="">
                            <h2 className="m-b-8px">CMND/CCCD</h2>
                            <div className="one_line w-140p m-b-4px">
                                <label className="m-r-4px w-150px m-l-4px"><b>ID:</b></label>
                                <input className="w-100p" placeholder="Ex: 0123456789"
                                    required
                                    onChange={(e) => setIdNumber(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="one_line w-140p m-b-4px">
                                <label className="m-r-4px w-150px m-l-4px"><b>Nơi cấp:</b></label>
                                <input className="w-100p" placeholder="Ex: Lâm Đồng"
                                    required
                                    onChange={(e) => setIssuePlace(e.target.value)}
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
                        />
                    </div>

                    <div className="form_control wrap_password flex_column_start w100">
                        <label className="m-b-4px">Password</label>
                        <input id="passwordInput" className="w100 m-b-4px p-lr-4px" type="password" placeholder="Enter your password..."
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form_control wrap_conf_password flex_column_start w100">
                        <label className="m-b-4px">Confirm Password</label>
                        <input id="confPasswordInput" className="w100 m-b-4px p-lr-4px" type="password" placeholder="Confirm password..."
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {loading && <Loader />}
                    <i className="red_16px_bold_m-t-4px">{message}</i>
                    <button className="register-btn" type="submit">Register</button>

                </form>
            </div>
        }
        </>
    )
}

export default RegisterPage
