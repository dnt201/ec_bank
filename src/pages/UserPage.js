import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import Loader from '../components/loader/Loader'
import Card from '../components/card/Card'
import FormChangePassword from '../components/formChangePassword/FormChangePassword'
import FormNapTien from '../components/formNapTien/FormNapTien';
import FormChuyenTien from '../components/formChuyenTien/FormChuyenTien';

import "react-datepicker/dist/react-datepicker.css";

import userImg from '../images/user-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faCheck, faUnlockAlt, faGlobeAsia, faDollarSign, faCreditCard, faChevronDown, faChevronRight, faExchangeAlt, faCoins, faInfo, faPen, faChartLine } from '@fortawesome/free-solid-svg-icons'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { updateUserProfile, viewAllCard } from '../actions/userActions'


import './UserPage.css'
import FormDoiMatKhauThe from '../components/formDoiMatKhauThe/FormDoiMatKhauThe';
import FormChiTietThe from '../components/formChiTietThe/FormChiTietThe';
import FormRutTien from '../components/formRutTien/FormRutTien';

const UserPage = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [message, setMessage] = useState("");

    const userInformation = useSelector((state) => state.userLogin)
    const { loading, userInfo } = userInformation
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const userViewAllCard = useSelector((state) => state.userViewAllCard)
    const { listCard } = userViewAllCard
    console.log(listCard)
    const addMoney = useSelector(state => state.addMoney)
    const transfer = useSelector(state => state.transfer)
    const withdraw = useSelector(state => state.withdraw)



    const [nameInput, setNameInput] = useState(userInfo?.name || null);
    const [emailInput, setEmailInput] = useState(userInfo?.email || null);
    const [birthdayInput, setBirthdayInput] = useState(userInfo?.birthDay || null);
    const [jobInput, setJobInput] = useState(userInfo?.job.job || null);
    const [placeInput, setPlaceInput] = useState(userInfo?.job.place || null);
    const [salaryInput, setSalaryInput] = useState(userInfo?.job.salary);
    const [idNumberInput, setIdNumberInput] = useState(userInfo?.personalID.IdNumber || null);
    const [issueDateInput, setIssueDateInput] = useState(userInfo?.personalID.IssueDate || null);
    const [issuePlaceInput, setIssuePlaceInput] = useState(userInfo?.personalID.IssuePlace || null);
    const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || null);
    const [address, setAddress] = useState(userInfo?.address || null);

    const [showDebitGlobal, setShowDebitGlobal] = useState(false);
    const [showCreditGlobal, setShowCreditGlobal] = useState(false);
    const [showDebitLocal, setShowDebitLocal] = useState(false);
    const [showNapTien, setShowNapTien] = useState(false);
    const [showChuyenTien, setShowChuyenTien] = useState(false);
    const [showRutTien, setShowRutTien] = useState(false);
    const [showChangePin, setShowChangePin] = useState(false);
    const [showDetailCard, setShowDetailCard] = useState(false);
    const [idTheClick, setIdTheClick] = useState();
    const [categoryTheClick, setCategoryTheClick] = useState();
    const [imgTheClick, setImgTheClick] = useState();
    const [ccvTheClick, setCcvTheClick] = useState();


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
       
    }, [])
    useEffect(()=>{
        dispatch(viewAllCard())
    },[transfer,addMoney,withdraw])
    useEffect(() => {
        if (userUpdateProfile) {
            if (userUpdateProfile.success) {
                setMessage("Your profile was updated successfully!")
            }
            else if (userUpdateProfile.error) {
                setMessage(userUpdateProfile.error);
            }
            else {
                setMessage("")
            }
        }
    }, [userUpdateProfile, userInfo])

    const handleClick = () => {
        setIsEdit(!isEdit);
    }
    const togglePopupChangePassword = () => {
        setIsChangePassword(!isChangePassword);
    }
    const handleSubmit = (e) => {
        handleClick()
        if ((idNumberInput === '' || issueDateInput === '' || issuePlaceInput === '' || jobInput === '' || placeInput === '' || salaryInput === '' || nameInput === '' || birthdayInput === '' || phoneNumber === '' || address === '') ||
            (idNumberInput === null || issueDateInput === null || issuePlaceInput === null || jobInput === null || placeInput === null || salaryInput === null || nameInput === null || birthdayInput === null || phoneNumber === null || address === null)) {
            setMessage("Th???y nh???p b??? thi???u r??i!!");
            setNameInput(userInfo.name);
            setBirthdayInput(userInfo.birthDay);
            setJobInput(userInfo.job.job);
            setPlaceInput(userInfo.job.place);
            setSalaryInput(userInfo.job.salary);
            setIdNumberInput(userInfo.personalID.IdNumber);
            setIssueDateInput(userInfo.personalID.IssueDate);
            setIssuePlaceInput(userInfo.personalID.IssuePlace);
            setPhoneNumber(userInfo.phoneNumber);
            setAddress(userInfo.address);
        }
        else dispatch(updateUserProfile(idNumberInput, issueDateInput, issuePlaceInput, jobInput, placeInput, salaryInput, nameInput, birthdayInput, phoneNumber, address))
    }
    const toggleDebitGlobal = () => {
        setShowDebitGlobal(!showDebitGlobal);
    }
    const toggleCreditGlobal = () => {
        setShowCreditGlobal(!showCreditGlobal);
    }
    const toggleDebitLocal = () => {
        setShowDebitLocal(!showDebitLocal);
    }
    const toggleNapTien = (id) => {
        setShowNapTien(!showNapTien)
        setIdTheClick(id)
    }
    const toggleChuyenTien = (id) => {
        setShowChuyenTien(!showChuyenTien)
        setIdTheClick(id)
    }
    const toggleChangePin = (id) => {
        setShowChangePin(!showChangePin)
        setIdTheClick(id)
    }
    const toggleRutTien = (id) => {
        setShowRutTien(!showRutTien)
        setIdTheClick(id)
    }
    const toggleDetailCard = (id, type, img, ccv) => {
        setShowDetailCard(!showDetailCard)
        setIdTheClick(id)
        setCategoryTheClick(type)
        setImgTheClick(img)
        setCcvTheClick(ccv || "")
    }

    return (
        <>
            {showChuyenTien && <FormChuyenTien numberCard={idTheClick} handleClose={toggleChuyenTien} />}
            {showNapTien && <FormNapTien numberCard={idTheClick} handleClose={toggleNapTien} />}
            {showChangePin && <FormDoiMatKhauThe bankAccount={idTheClick} handleClose={toggleChangePin} />}
            {showRutTien && <FormRutTien numberCard={idTheClick} handleClose={toggleRutTien}/>}
            {showDetailCard && <FormChiTietThe name={userInfo.name} cardNumber={idTheClick} image={imgTheClick} ccv={ccvTheClick} category={categoryTheClick} handleClose={toggleDetailCard} />}
            {userInfo !== null ?
                <div className="user-page">
                    {loading && <Loader />}
                    {userUpdateProfile && userUpdateProfile.loading && <Loader />}
                    <div className="container-user-information">
                        <div className="user-avatar-name ">
                            <img className="avatar center m-b-8px" src={userImg} alt="avatar user" />
                            <input className="w-100p m-b-8px t-a-center"
                                value={nameInput}
                                disabled={!isEdit}
                                onChange={(e) => setNameInput(e.target.value)}
                            ></input>
                            <DatePicker
                                className="w-100p m-b-8px t-a-center"
                                disabled={!isEdit}
                                selected={moment(birthdayInput).isValid() ? moment(birthdayInput).toDate() : null}
                                onChange={(date) => setBirthdayInput(date)}
                                dateFormat="MM/dd/yyyy"
                                maxDate={new Date()}
                            />
                            <div className="wrap-button-user  ">
                                <button className="btn-sua-thong-tin"
                                    disabled={isEdit}
                                    onClick={handleClick}>S???a th??ng tin <FontAwesomeIcon className="icon-sua-thong-tin" icon={faWrench} />
                                </button>
                                <button className="btn-luu-thong-tin"
                                    disabled={!isEdit}
                                    onClick={handleSubmit}>L??u th??ng tin <FontAwesomeIcon className="icon-luu-thong-tin" icon={faCheck} />
                                </button>
                            </div>
                            <button className="btn-doi-mat-khau"
                                onClick={togglePopupChangePassword}>?????i m???t kh???u  <FontAwesomeIcon className="icon-doi-mat-khau" icon={faUnlockAlt} />
                            </button>
                            {userInfo && userInfo.role !== "admin" &&
                             <Link className="btn btn-chart" to="/my-log" >Bi???n ?????ng s??? d?? <FontAwesomeIcon className="icon-chart" icon={faChartLine} />
                             </Link>
                            }
                            
                            {false && <i> Some things went wrong bro!!</i>}
                        </div>
                        <div className="user-information">
                            <h1 className="title t-a-center"> Th??ng tin </h1>
                            <i className="red_16px_bold_m-t-4px t-a-center  ">{message}</i>

                            <div className="flex-column">
                                {userInfo !== null && userInfo.isActivate === 0 && <i className="red_16px_bold_m-t-4px word-break">T??i kho???n c???a b???n ch??a ???????c k??ch ho???t, vui l??ng check mail: {emailInput} ????? k??ch ho???t!</i>}
                                <div className="w-100p m-b-8px">
                                    <span className="m-r-4px w-span-set"><b>T??i kho???n:</b></span>
                                    <span className="w-100p word-break">{emailInput}</span>
                                </div>
                                <div className="one_line">
                                    <span className="m-r-4px"><b>S??T: </b></span>
                                    <input className="w-100p"
                                        disabled={!isEdit}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    ></input>
                                </div>
                                <div className="job-perID">
                                    <div>
                                        <h2 className="t-a-center m-t-16px m-b-8px">C??ng vi???c</h2>
                                        <div className="one_line m-b-8px ">
                                            <span className="m-r-4px w-span-set"><b>Job:</b></span>
                                            <input className="w-100p"
                                                value={jobInput}
                                                disabled={!isEdit}
                                                onChange={(e) => setJobInput(e.target.value)}
                                            >
                                            </input>
                                        </div>
                                        <div className="one_line m-b-8px ">
                                            <span className="m-r-4px w-span-set"><b>Place:</b></span>
                                            <input className="w-100p"
                                                value={placeInput}
                                                disabled={!isEdit}
                                                onChange={(e) => setPlaceInput(e.target.value)}
                                            >
                                            </input>
                                        </div>
                                        <div className="one_line m-b-8px ">
                                            <span className="m-r-4px w-span-set"><b>Salary:</b></span>
                                            <NumberFormat className="w-100p"
                                                disabled={!isEdit}
                                                value={salaryInput}
                                                onChange={(e) => setSalaryInput(e.target.value)}
                                                decimalScale={0}
                                                thousandSeparator={true}
                                                suffix=" ??"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="t-a-center m-t-16px m-b-8px">CMND/CCCD</h2>
                                        <div className="one_line m-b-8px ">
                                            <span className="m-r-4px w-span-set"><b>ID:</b></span>
                                            <input className="w-100p"
                                                value={idNumberInput}
                                                disabled={!isEdit}
                                                onChange={(e) => setIdNumberInput(e.target.value)}
                                            >
                                            </input>
                                        </div>
                                        <div className="one_line m-b-8px ">
                                            <span className="m-r-4px w-span-set"><b>N??i c???p:</b></span>
                                            <input className="w-100p"
                                                value={issuePlaceInput}
                                                disabled={!isEdit}
                                                onChange={(e) => setIssuePlaceInput(e.target.value)}
                                            >
                                            </input>
                                        </div>
                                        <div className="one_line m-b-8px ">
                                            <span className="m-r-4px w-span-set"><b>Ng??y c???p:</b></span>
                                            <DatePicker
                                                className="w-100p"
                                                disabled={!isEdit}
                                                selected={moment(issueDateInput).isValid() ? moment(issueDateInput).toDate() : null}
                                                onChange={(date) => setIssueDateInput(date)}
                                                dateFormat="MM/dd/yyyy"
                                                maxDate={new Date()}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className=" ">
                                        <h2 className="t-a-center m-t-16px m-b-8px">?????a ch???</h2>
                                        <textarea rows="5" className="w-100p"
                                            defaultValue={address}
                                            disabled={!isEdit}
                                            onChange={(e) => setAddress(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {userInfo && userInfo.role === "admin" ? null : userViewAllCard.loading ? <Loader/> :
                        <div className="list-item">
                            <h1 className="list-item-title"> Danh s??ch th???</h1>
                            <div className="list-item-qty">
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Th??? ghi n??? n???i ?????a</div>
                                        <div className="number">
                                            {listCard?.[0]?.value?.length || 0}
                                        </div>
                                        <div className="indicator">
                                            <i className='fa fa-arrow-alt-circle-down'></i>
                                            <span className="text">C???p nh???t trong th??ng</span>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon icon={faDollarSign} className='fa fa-dollar-sign cart one' />
                                </div>
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Th??? ghi n??? qu???c t???</div>
                                        <div className="number">
                                            {listCard?.[1]?.value?.length || 0}
                                        </div>
                                        <div className="indicator">
                                            <i className='fa fa-arrow-alt-circle-down'></i>
                                            <span className="text">C???p nh???t trong th??ng</span>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon icon={faCreditCard} className='fa fa-dollar-sign cart two' />

                                </div>
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Th??? t??n d???ng qu???c t???</div>
                                        <div className="number">
                                            {listCard?.[2]?.value?.length || 0}
                                        </div>
                                        <div className="indicator">
                                            <i className='fa fa-arrow-alt-circle-up'></i>
                                            <span className="text">C???p nh???t trong th??ng</span>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon icon={faGlobeAsia} className='fa fa-dollar-sign cart three' />

                                </div>
                            </div>

                            <div className="list-card" >
                                <div className={"list-card_item one" + (showDebitGlobal === true ? " active" : "")}>
                                    <div className="item_header" onClick={toggleDebitGlobal} >
                                        <h2 className="flex-1">Th??? ghi n??? n???i ?????a</h2>
                                        <div className="wrap_button" >
                                            <FontAwesomeIcon icon={faChevronDown} />
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </div>
                                    </div>
                                    {listCard?.[0]?.value?.length > 0 ?
                                        listCard[0].value.map((item) => (
                                            <div key={item.cardNumber} className="item_body debit-global">
                                                <div className="flex-1 card">
                                                    <Card name={userInfo.name} image={item.image} number={item.cardNumber} type={listCard?.[0].name} />
                                                </div>
                                                <div className="flex-1 item_body-wrap">
                                                    <div className="item_body-wrap_information flex-1 w-100p">
                                                        <h2 className="t-a-center">Th??ng tin</h2>
                                                        <div className="one_line">
                                                            <b className="m-l-5p">Card number: </b>
                                                            <span className="m-r-5p">{item.cardNumber.slice(0, 4)} {item.cardNumber.slice(4, 8)} {item.cardNumber.slice(8, 12)} {item.cardNumber.slice(12, 16)}</span>
                                                        </div>
                                                        <div className="one_line">
                                                            <b className="m-l-5p">S??? ti???n trong th???: </b>
                                                            <span className="m-r-5p">{Intl.NumberFormat('de-DE').format(item.bankAccount) + " ??"}</span>
                                                        </div>

                                                    </div>
                                                    <div className="item_body-wrap_button">
                                                        <h2 className="t-a-center m-b-4px">Actions</h2>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-transfer" onClick={() => toggleChuyenTien(item.cardNumber)}>Chuy???n kho???n <FontAwesomeIcon icon={faExchangeAlt} /> </button>
                                                            <button className="btn btn-refund" onClick={() => toggleNapTien(item.cardNumber)}>N???p ti???n <FontAwesomeIcon icon={faCoins} /> </button>
                                                        </div>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-withdraw" onClick={() => toggleRutTien(item.cardNumber)}>R??t ti???n <FontAwesomeIcon icon={faDollarSign} /> </button>
                                                            <button className="btn btn-change" onClick={() => toggleChangePin(item.cardNumber)}>Change Pin <FontAwesomeIcon icon={faPen} /> </button>
                                                        </div>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-detail alone" onClick={() => toggleDetailCard(item.cardNumber, listCard?.[0].name, item.image)}>Detail <FontAwesomeIcon icon={faInfo} /> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <i className="item_body t-a-center">Hi???n t???i b???n ch??a s??? h???u th??? ghi n??? n???i ?????a n??o!</i>
                                    }

                                </div>
                                <div className={"list-card_item two" + (showCreditGlobal === true ? " active" : "")}>
                                    <div className="item_header" onClick={toggleCreditGlobal}>
                                        <h2 className="flex-1">Th??? ghi n??? qu???c t???</h2>
                                        <div className="wrap_button" >
                                            <FontAwesomeIcon icon={faChevronDown} />
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </div>
                                    </div>
                                    {listCard?.[1]?.value?.length > 0 ?
                                        listCard[1].value.map((item) => (
                                            <div key={item.cardNumber} className="item_body credit-global">
                                                <div className="flex-1 card">
                                                    <Card name={userInfo.name} image={item.image} number={item.cardNumber} type={listCard?.[1].name} />
                                                </div>
                                                <div className="flex-1 item_body-wrap">
                                                    <div className="item_body-wrap_information flex-1 w-100p">
                                                        <h2 className="t-a-center">Th??ng tin</h2>
                                                        <div className="one_line">
                                                            <b className="m-l-5p">Card number: </b>
                                                            <span className="m-r-5p">{item.cardNumber.slice(0, 4)} {item.cardNumber.slice(4, 8)} {item.cardNumber.slice(8, 12)} {item.cardNumber.slice(12, 16)}</span>
                                                        </div>
                                                        <div className="one_line">
                                                            <b className="m-l-5p">S??? ti???n trong th???: </b>
                                                            <span className="m-r-5p">{Intl.NumberFormat('de-DE').format(item.bankAccount) + " ??"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item_body-wrap_button">
                                                        <h2 className="t-a-center m-b-4px">Actions</h2>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-transfer" onClick={() => toggleChuyenTien(item.cardNumber)}>Chuy???n kho???n <FontAwesomeIcon icon={faExchangeAlt} /> </button>
                                                            <button className="btn btn-refund" onClick={() => toggleNapTien(item.cardNumber)}>N???p ti???n <FontAwesomeIcon icon={faCoins} /> </button>
                                                        </div>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-withdraw" onClick={() => toggleRutTien(item.cardNumber)}>R??t ti???n <FontAwesomeIcon icon={faDollarSign} /> </button>
                                                            <button className="btn btn-change" onClick={() => toggleChangePin(item.cardNumber)}>Change Pin <FontAwesomeIcon icon={faPen} /> </button>
                                                        </div>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-detail alone" onClick={() => toggleDetailCard(item.cardNumber, listCard?.[1].name, item.image)}>Detail <FontAwesomeIcon icon={faInfo} /> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <i className="item_body t-a-center">Hi???n t???i b???n ch??a s??? h???u th??? ghi n??? qu???c t??? n??o!</i>
                                    }
                                </div>
                                <div className={"list-card_item three" + (showDebitLocal === true ? " active" : "")}>
                                    <div className="item_header" onClick={toggleDebitLocal}>
                                        <h2 className="flex-1">Th??? t??n d???ng qu???c t???</h2>
                                        <div className="wrap_button" >
                                            <FontAwesomeIcon icon={faChevronDown} />
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </div>
                                    </div>
                                    {listCard?.[2]?.value?.length > 0 ?
                                        listCard[2].value.map((item) => (
                                            <div key={item.cardNumber} className="item_body debit-local">
                                                <div className="flex-1 card">
                                                    <Card name={userInfo.name} image={item.image} number={item.cardNumber} type={listCard?.[2].name} ccv={item.CCV} />
                                                </div>
                                                <div className="flex-1 item_body-wrap">
                                                    <div className="item_body-wrap_information flex-1 w-100p">
                                                        <h2 className="t-a-center">Th??ng tin</h2>
                                                        <div className="one_line">
                                                            <b className="m-l-5p">Card number: </b>
                                                            <span className="m-r-5p">{item.cardNumber.slice(0, 4)} {item.cardNumber.slice(4, 8)} {item.cardNumber.slice(8, 12)} {item.cardNumber.slice(12, 16)}</span>
                                                        </div>
                                                        <div className="one_line">
                                                            <b className="m-l-5p">S??? t??n d???ng kh??? d??:</b>
                                                            <span className="m-r-5p">{Intl.NumberFormat('de-DE').format(item.bankAccount) + " ??"} </span>

                                                        </div>
                                                    </div>
                                                    <div className="item_body-wrap_button">
                                                        <h2 className="t-a-center m-b-4px">Actions</h2>
                                                        <div className="m-b-4px lazyqtqd">
                                                            <button className="btn btn-detail alone" onClick={() => toggleDetailCard(item.cardNumber, listCard?.[2].name, item.image, item.CCV)}>Detail <FontAwesomeIcon icon={faInfo} /> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <i className="item_body t-a-center">Hi???n t???i b???n ch??a s??? h???u th??? t??n d???ng qu???c t??? n??o!</i>
                                    }
                                </div>

                            </div>
                        </div>
                    }
                    {isChangePassword && <FormChangePassword handleClose={togglePopupChangePassword} />}
                </div>
                : (navigate('/login'))
            }
        </>
    )
}

export default UserPage
