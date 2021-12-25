import React from 'react'
import backgroundImage from './background.jpg';

import {Link} from 'react-router-dom'



import './Banner.css'

const Header = () => {

    return (
        <header style={{
            backgroundImage: `url(${backgroundImage})`,
        }}>
            <div className="title">
                <h1 >Welcome to our bank!</h1>
                <p>Ưu đãi hấp dẫn dành cho mọi thành viên.</p>
                <Link to="/register" className="regisNow">Đăng ký ngay</Link>
            </div>
        </header>
    )
}

export default Header
