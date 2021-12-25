import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faStore, faFileInvoice,faLaughWink,faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import ComingSoon from '../pages/ComingSoon'
import AdminListUser from '../components/admin/listuser/AdminListUser'
import Log from '../components/admin/listTransaction/Log'
import './AdminPage.css'
import AdminListCard from '../components/admin/listCard/AdminListCard'
const AdminPage = () => {

    const [showWhat, setShowWhat] = useState("dashboard")
    const handleInput = (e) => {
        setShowWhat(e.target.id)
        console.log(showWhat)
    }

    return (
        <div className="adminPage">
            <div className="nav-left-admin">
                <div className="title"><FontAwesomeIcon icon={faLaughWink}/> Admin</div>
                <button
                    className="btn border"
                    id="dashboard"
                    onClick={(e) => handleInput(e)}
                >
                    <FontAwesomeIcon icon={faTachometerAlt} className="w-20p" /> Dash board
                </button>
                <span className="title-lazy">Admin management</span>

                <button
                    className="btn"
                    id="user"
                    onClick={(e) => handleInput(e)}
                >
                    <FontAwesomeIcon icon={faUsers} className="w-20p" /> User
                </button>
                <button
                    className="btn"
                    id="card"
                    onClick={(e) => handleInput(e)}
                >

                    <FontAwesomeIcon icon={faStore} className="w-20p" />  Card
                </button>
                <button
                    className="btn"
                    id="transaction"
                    onClick={(e) => handleInput(e)}
                >
                    <FontAwesomeIcon icon={faFileInvoice} className="w-20p" /> Transaction
                </button>
            </div>
            <div className="container-right-admin">
                {showWhat === "user" ? <AdminListUser handleLazy={setShowWhat} /> 
                :
                showWhat === "card" ? <div><AdminListCard handleLazy={setShowWhat} /></div> 
                : 
                showWhat==="transaction" ? <Log handleLazy={setShowWhat}/>
                :
                <div> <ComingSoon/> </div>
                }
            </div>

        </div>

    )
}

export default AdminPage
