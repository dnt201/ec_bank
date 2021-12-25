import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Loader from '../../loader/Loader'

import { viewAllLog } from '../../../actions/userActions';

import './Log.css'

const Log = (props) => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const viewAllState = useSelector(state => state.viewAllLog)
    console.log(viewAllState)
    useEffect(() => {
        if (userLogin && userLogin.userInfo === null)
            (navigate('/login'))
        else if (userLogin && userLogin.userInfo.role === "user")
            (navigate('/user'))
        else
            console.log()
        dispatch(viewAllLog())
    }, [])

    return (
        <> {userLogin && userLogin.userInfo === null ? (navigate('/login')) :
            (viewAllState && viewAllState.loading ? <div className="loader_center_screen"><Loader /></div> :
                <><div className="bread-crump">
                    <div>
                        <button onClick={() => props.handleLazy("dashboard")}> Admin </button>
                        <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
                    </div>
                    <div>
                        <b className="cl-red">List transaction</b>
                    </div>
                </div><div className="log-container">
                        <h1 className="t-a-center">List transaction <i>{"(" + viewAllState?.numberofLogs + ")"}</i></h1>
                        <div className="log-list">
                            {viewAllState && viewAllState?.Logs?.map((log) => (
                                <div key={log._id} className="log-item">
                                    <div className="">
                                        <div className="flex-row log-lazy">
                                            <span><b className="f-s-18px"> ID giao dịch:</b> {log._id}</span>
                                            <span><b className="f-s-18px"> Loại giao dịch: </b>{log.type} </span>
                                            <span><b className="f-s-18px"> Số tiền: </b>{log.amount}</span>
                                        </div>
                                        <span><b className="f-s-18px">Message:</b> {log.message}</span>
                                    </div>
                                    {log.type === "Charge" ?
                                        <div >
                                            <b className="f-s-20px  m-r-4px">To:</b>
                                            <span><b className="f-s-18px  m-r-4px">ID User:</b> {log.from.user}</span>
                                            <span><b className="f-s-18px m-r-4px">Loại thẻ:</b> {log.from.typeAccount}</span>
                                        </div>
                                        :
                                        <div>
                                            <div>
                                                <b className="f-s-20px  m-r-4px">From:</b>
                                                <span><b className="f-s-18px  m-r-4px">ID User:</b> {log.from.user}</span>
                                                <span><b className="f-s-18px  m-r-4px">Loại thẻ:</b> {log.from.typeAccount}</span>
                                            </div>
                                            <div>
                                                <b className="f-s-20px  m-r-4px">To:</b>
                                                <span><b className="f-s-18px  m-r-4px">ID User:</b> {log.to.user}</span>
                                                {log.to.typeAccount && <span className=" m-r-4px"><b className="f-s-18px ">Loại thẻ:</b> {log.to.typeAccount}</span>}
                                                {log.to.bankAccount && <span className=" m-r-4px"><b className="f-s-18px  m-r-4px">ID thẻ:</b> {log.to.bankAccount}</span>}
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>

                    </div>
                </>

            )
        }

        </>
    )
}

export default Log
