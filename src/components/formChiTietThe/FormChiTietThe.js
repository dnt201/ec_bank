import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../loader/Loader'
import Card from '../card/Card'

import './FormChiTietThe.css'
import { viewMyCardDetail } from '../../actions/userActions'

const FormChiTietThe = (props) => {
    const dispatch = useDispatch()

    const myCardDetail = useSelector((state) => state.viewMyCardDetail)
    const { loading, info } = myCardDetail

    console.log(myCardDetail)

    useEffect(() => {
        dispatch(viewMyCardDetail(props.category, props.cardNumber))
    }, [])
    return (
        <div>
            <div className="form-popup">
                <div className="form-detail-card-container">
                    <h1 className="t-a-center">Detail card</h1>
                    <h2 className="t-a-center"><i>Num of card: {props.cardNumber}</i></h2>
                    {loading && <div className="loader_center_screen"><Loader /></div>}
                    <button className="btn-lazyzyzy" onClick={props.handleClose} ><FontAwesomeIcon icon={faTimes} /></button>
                    <div className="content">
                        <div className="card">
                            <Card name={props.name} image={props.image} number={props.cardNumber} type={props.category} ccv={props.ccv} />

                        </div>
                        <div className="infor">
                            <div className="one_line">
                            {props.category && props.category !== "GlobalCreditCard" ? <b>Số dư tài khoản:</b> : <b>Số tín dụng khả dư:</b>}
                                <span>{Intl.NumberFormat('de-DE').format(info?.BankAccount) + " đ"}</span>
                            </div>
                            <div className="one_line">
                                <b>Số tiền đã sử dụng hôm nay:</b>
                                <span>{Intl.NumberFormat('de-DE').format(info?.AmountToday) + " đ"}</span>
                            </div>
                            <div className="one_line">
                                <b>Số tiền còn lại có thể sử dụng hôm nay:</b>
                                <span>{Intl.NumberFormat('de-DE').format(info?.CanUse?.pay) + " đ"}</span>
                            </div>
                            {props.category && props.category !== "GlobalCreditCard" && <>
                                <div className="one_line">
                                    <b>Số tiền còn lại có thể chuyển hôm nay:</b>
                                    <span>{Intl.NumberFormat('de-DE').format(info?.CanUse?.transfer) + " đ"}</span>
                                </div>
                                <div className="one_line">
                                    <b>Số tiền còn lại có thể rút hôm nay:</b>
                                    <span>{Intl.NumberFormat('de-DE').format(info?.CanUse?.withdraw) + " đ"}</span>
                                </div>
                            </>}
                            {props.category && props.category !== "GlobalCreditCard" && <>
                                <div className="one_line">
                                    <b>Số tiền đã sử dụng hôm nay:</b>
                                    <span>{Intl.NumberFormat('de-DE').format(info?.UseToday?.pay) + " đ"}</span>
                                </div>

                                <div className="one_line">
                                    <b>Số tiền đã chuyển hôm nay:</b>
                                    <span>{Intl.NumberFormat('de-DE').format(info?.UseToday?.transfer) + " đ"}</span>
                                </div>
                                <div className="one_line">
                                    <b>Số tiền đã rút hôm nay:</b>
                                    <span>{Intl.NumberFormat('de-DE').format(info?.UseToday?.withdraw) + " đ"}</span>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FormChiTietThe
