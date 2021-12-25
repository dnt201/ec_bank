import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { getAllCard } from '../../actions/cardActions'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCaretDown, faCaretRight, faUser } from '@fortawesome/free-solid-svg-icons'
import logoImg from "../../images/Logo.png"
import { logout } from '../../actions/userActions'


import './Navbar.css'

const Navbar = () => {
    const dispatch = useDispatch();
    const [navToggle, setNavToggle] = useState(false);
    const userLogin = useSelector((state) => state.userLogin)

    useEffect(() => {
        dispatch(getAllCard());
    }, [])

    const allCard = useSelector((state) => state.allCard);
    var listCard = allCard.listCard;


    const toggleNav = () => {
        setNavToggle(!navToggle);
    }
    const logoutHandler = () => {
        dispatch(logout())
    }
    const renderNav = () => {
        let className = "";
        if (navToggle) {
            className += " active";
        }
        return className;
    }
    return (
        <div>
            <nav className={renderNav()}>
                <div className="menu-icons" onClick={toggleNav}>
                    <FontAwesomeIcon icon={faBars} />
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <Link to="/#" className="logo">
                    <img
                        src={logoImg}
                        alt="" />
                </Link>
                <ul className="nav-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <div className="cont" type="button" >Products <FontAwesomeIcon icon={faCaretDown} /></div>
                        <ul className="sub-menu" >
                            {listCard && listCard.map((card) => (
                                <li key={card.name}>
                                    <div className="cont flex_row_center_between" to="/#">{card.name}<FontAwesomeIcon icon={faCaretRight} /></div>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link key={card.name} className="ta-center cl_orange" to={"/" + card.path}>{card.name}</Link>
                                        </li>
                                        {card.children && card.children.map((cardChild) => (
                                            <li key={cardChild._id}>
                                                <Link to={card.path+"/"+cardChild.name.replace(/[ ]/g, "%20")}>{cardChild.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <div className="move-right">
                        {(userLogin && userLogin.userInfo) ?
                            <>
                                <li className="cover-size btn user">
                                    <Link to="/user" className="p_8_24"><FontAwesomeIcon icon={faUser} /></Link>
                                </li>
                                <li className="cover-size btn logout">
                                    <button onClick={logoutHandler}>Log out</button>
                                </li>
                            </> :
                            <>
                                <li className="cover-size btn login">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="cover-size btn login">
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        }
                        {userLogin && userLogin?.userInfo?.role === "admin" && <li className="cover-size btn admin">
                            <Link to="/admin">Admin</Link>
                        </li>
                        }

                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
