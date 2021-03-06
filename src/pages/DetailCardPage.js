import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getDetailCard } from '../actions/cardActions'

import Card from '../components/card/Card'
import Loader from '../components/loader/Loader'
import { faChevronRight, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './DetailCardPage.css'
import Policy from '../components/policy/Policy'
import FormDangKyThe from '../components/formDangKyThe/FormDangKyThe'

const DetailCardPage = (props) => {
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(0)
    const [isRegister, setIsRegister] = useState(false);
    console.log(isActive);

    const userInformation = useSelector((state) => state.userLogin)
    const { userInfo } = userInformation

    const detailCard = useSelector(state => state.detailCard)
    const card = detailCard?.cardInfo?.card?.[0];
    console.log(props, card)
    useEffect(() => {
        dispatch(getDetailCard(props.category.name, props.type))
    }, [])

    const HandleRegisterClick = () => {
        setIsRegister(!isRegister)
    }

    return (
        <div className="detail-card-container">
            {isRegister && <FormDangKyThe card={props} handleClose={HandleRegisterClick} />}
            <div className="detail-card">
                <div className="detail-card-header">
                    <div className="detail-card-header_left">
                        <div className="bread-crump">
                            <div>
                                <Link to={"/"}>Home</Link>
                                <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
                            </div>
                            <div>
                                <Link to={"/" + props.type}>{props.type}</Link>
                                <FontAwesomeIcon icon={faChevronRight} className="bread-crump-icon" />
                            </div>
                            <div>
                                <b className="cl-red">{props.category.name}</b>
                            </div>
                        </div>

                        {props.type && props.type === "GlobalDebitCard" ? <h1>Th??? ghi n??? qu???c t???</h1> :
                            props.type && props.type === "GlobalCreditCard" ? <h1>Th??? t??n d???ng qu???c t???</h1> :
                                props.type && props.type === "LocalDebitCard" ? <h1>Th??? ghi n??? n???i ?????a</h1> : null
                        }
                        <h2>{props.category.name}</h2>
                    </div>
                    <div className="detail-card-header_right"> <Card image={props.category.image} type={props.type} /></div>
                </div>
                <div className="detail-card-body">
                    {card && card.loading && <div className="lazy_loader_center"><Loader /></div>}
                    {props.type && props.type === "GlobalDebitCard" ?
                        card &&
                        <>
                            <div key="1" className={"detail-card-body_wrap " + (isActive === "1" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "1") setIsActive("0"); else setIsActive("1") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin ch??nh
                                </h1>
                                <div className="detail-card-body_body">
                                    <div>
                                        <b>Name:</b>
                                        <span> {card.name}</span>
                                    </div>
                                    <div>
                                        <b>Ranking: </b>
                                        <span> {card.ranking}</span>

                                    </div>
                                    <div>
                                        <b>Ph?? chuy???n kho???n: </b>
                                        <span> {Intl.NumberFormat('en-IN').format(card.transactionFee.transferFee) + " %"}</span>
                                    </div>
                                    <div>
                                        <b>Ph?? r??t ti???n m???t: </b>
                                        <span> {Intl.NumberFormat('de-DE').format(card.transactionFee.withdrawFee) + " ??"} </span>
                                    </div>
                                </div>
                            </div>
                            <div key="2" className={"detail-card-body_wrap " + (isActive === "2" && "active")} >

                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "2") setIsActive("0"); else setIsActive("2") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin v??? thanh to??n
                                </h1>

                                <div className="detail-card-body_body">
                                    <div>
                                        <b>S??? ti???n thanh to??n trong m???t ng??y: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumAmountPerDay) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? ti???n t???i ??a c???a m???t giao d???ch: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumLimit) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? ti???n t???i thi???u c???a m???t giao d???ch: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.minimumLimit) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? giao d???ch t???i ??a c???a m???t ng??y: </b>
                                        <span>{card.transactionLimit.payLimit.maximumTimePerDay} giao d???ch</span>
                                    </div>
                                </div>
                            </div>
                            <div key="3" className={"detail-card-body_wrap " + (isActive === "3" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "3") setIsActive("0"); else setIsActive("3") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin v??? r??t ti???n
                                </h1>
                                <div className="detail-card-body_body">
                                    <div>
                                        <b>S??? ti???n r??t t???i ??a m???t ng??y: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumAmountPerDay) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? ti???n r??t t???i ??a c???a m???t l???n: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumLimit) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? ti???n t???i thi???u c???a m???t l???n r??t: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.minimumLimit) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? l???n r??t t???i ??a c???a m???t ng??y: </b>
                                        <span>{card.transactionLimit.withdrawLimit.maximumTimePerDay} giao d???ch.</span>
                                    </div>
                                </div>
                            </div>
                            <div key="4" className={"detail-card-body_wrap " + (isActive === "4" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "4") setIsActive("0"); else setIsActive("4") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin v??? chuy???n kho???n
                                </h1>
                                <div className="detail-card-body_body">
                                    <div>
                                        <b>S??? ti???n t???i ??a c?? th??? chuy???n trong m???t ng??y: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumAmountPerDay) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? ti???n t???i ??a c?? th??? chuy???n trong m???t l???n: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumLimit) + " ??"}</span>
                                    </div>
                                    <div>
                                        <b>S??? l???n c?? th??? chuy???n trong m???t ng??y: </b>
                                        <span>{card.transactionLimit.transferLimit.maximumTimePerDay} giao d???ch.</span>
                                    </div>
                                </div>
                            </div>
                            <div key="5" className={"detail-card-body_wrap " + (isActive === "5" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "5") setIsActive("0"); else setIsActive("5") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> T??nh n??ng c???a s???n ph???m
                                </h1>
                                <div className="detail-card-body_body">
                                    <div><span>Giao d???ch t???i h??ng tri???u ??i???m m???ng l?????i ATM/POS c?? bi???u t?????ng MasterCard/Visa tr??n to??n c???u</span></div>
                                    <div><span>Thanh to??n tr???c tuy???n h??ng h??a, d???ch v??? t???i c??c website c?? bi???u t?????ng ch???p nh???n thanh to??n b???ng th??? MasterCard/visa tr??n to??n c???u</span></div>
                                    <div><span>Giao d???ch b???ng b???t k??? lo???i ti???n t??? n??o.</span></div>
                                    <div><span>C??ng ngh??? th??? chip theo chu???n EMV b???o m???t t???i ??u</span></div>
                                    <div><span>Qu???n l?? chi ti??u hi???u qu???, an to??n th??ng qua tin nh???n BSMS.</span></div>
                                    <div><span>Chuy???n ti???n li??n ng??n h??ng 24/7 tr??n ATM c???a NDTH</span></div>
                                </div>
                            </div>
                        </>
                        :
                        props.type && props.type === "GlobalCreditCard" ?
                            card &&
                            <>
                                <div key="1" className={"detail-card-body_wrap " + (isActive === "1" && "active")} >
                                    <h1 className="detail-card-body_header" onClick={() => { if (isActive === "1") setIsActive("0"); else setIsActive("1") }}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin ch??nh
                                    </h1>
                                    <div className="detail-card-body_body">
                                        <div>
                                            <b>Name:</b>
                                            <span> {card.name}</span>
                                        </div>
                                        <div>
                                            <b>Ranking: </b>
                                            <span> {card.ranking}</span>

                                        </div>
                                        <div>
                                            <b>Ng??y sao k??: </b>
                                            <span> {card.cardStatementDate} </span>
                                        </div>
                                        <div>
                                            <b>Ng??y ?????n h???n thanh to??n sao k??: </b>
                                            <span> {card.paymentDate} ng??y sau ng??y sao k??</span>
                                        </div>
                                        <div>
                                            <b>T??? l??? thanh to??n t???i thi???u: </b>
                                            <span> {card.minimumPayoutRate}% </span>
                                        </div>
                                        <div>
                                            <b>H???n m???c t??n d???ng: </b>
                                            <span> {Intl.NumberFormat('de-DE').format(card.creditLimit) + " ??"}</span>
                                        </div>
                                        <div>
                                            <b>L??i su???t: </b>
                                            <span> {card.interestRate}% </span>
                                        </div>
                                    </div>
                                </div>
                                <div key="2" className={"detail-card-body_wrap " + (isActive === "2" && "active")} >
                                    <h1 className="detail-card-body_header" onClick={() => { if (isActive === "2") setIsActive("0"); else setIsActive("2") }}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> T??nh n??ng c???a s???n ph???m
                                    </h1>
                                    <div className="detail-card-body_body">
                                        <div><span>Giao d???ch t???i h??ng tri???u ??i???m m???ng l?????i ATM/POS c?? bi???u t?????ng MasterCard/Visa tr??n to??n c???u</span></div>
                                        <div><span>Thanh to??n tr???c tuy???n h??ng h??a, d???ch v??? t???i c??c website c?? bi???u t?????ng ch???p nh???n thanh to??n b???ng th??? MasterCard/Visa tr??n to??n c???u</span></div>
                                        <div><span>C??ng ngh??? b???o m???t hi???n ?????i v?? ti??n ti???n theo chu???n qu???c t??? v???i n???n t???ng c??ng ngh??? EMV contact v?? contactless c??ng gi???i ph??p x??c th???c 3D-Secure cho giao d???ch thanh to??n tr???c tuy???n</span></div>
                                        <div><span>C??ng ngh?? th??? Quick Read (c??c th??ng tin th??? ??? m???t sau): thu???n ti???n khi giao d???ch online </span></div>
                                        <div><span>B???o hi???m to??n c???u v???i gi?? tr??? l??n t???i 11,65 t??? ?????ng</span></div>
                                    </div>
                                </div>
                                <div key="3" className={"detail-card-body_wrap " + (isActive === "3" && "active")} >
                                    <h1 className="detail-card-body_header" onClick={() => { if (isActive === "3") setIsActive("0"); else setIsActive("3") }}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Quy tr??nh ph??t h??nh th???
                                    </h1>
                                    <div className="detail-card-body_body">
                                        <div><span>Ti???n l???i, nhanh ch??ng, t???c th???i!</span></div>
                                        <div><span>?????t ????? c??c ??i???u ki???n, ti??u chi c???a th???!</span></div>
                                        <div><span>M???i ng?????i d??ng, m???i ?????i t?????ng!</span></div>
                                        <div><span>H??? tr??? 24/7/365 t???i c??c chi nh??nh c???a NDTH Bank</span></div>
                                    </div>
                                </div>
                            </>
                            :
                            props.type && props.type === "LocalDebitCard" ?
                                card &&
                                <>
                                    <div key="1" className={"detail-card-body_wrap " + (isActive === "1" && "active")} >
                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "1") setIsActive("0"); else setIsActive("1") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin ch??nh
                                        </h1>
                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>Name:</b>
                                                <span> {card.name}</span>
                                            </div>
                                            <div>
                                                <b>Ranking: </b>
                                                <span> {card.ranking}</span>

                                            </div>
                                            <div>
                                                <b>Ph?? chuy???n kho???n: </b>
                                                <span> {Intl.NumberFormat('en-IN').format(card.transactionFee.transferFee) + " %"}</span>
                                            </div>
                                            <div>
                                                <b>Ph?? r??t ti???n m???t: </b>
                                                <span> {Intl.NumberFormat('de-DE').format(card.transactionFee.withdrawFee) + " ??"} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="2" className={"detail-card-body_wrap " + (isActive === "2" && "active")} >

                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "2") setIsActive("0"); else setIsActive("2") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin v??? thanh to??n
                                        </h1>

                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>S??? ti???n c?? th??? thanh to??n: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumAmountPerDay) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? ti???n t???i ???? c???a m???t giao d???ch: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumLimit) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? ti???n t???i thi???u c???a m???t giao d???ch: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.minimumLimit) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? giao d???ch t???i ??a c???a m???t ng??y: </b>
                                                <span>{card.transactionLimit.payLimit.maximumTimePerDay} giao d???ch</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="3" className={"detail-card-body_wrap " + (isActive === "3" && "active")} >
                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "3") setIsActive("0"); else setIsActive("3") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin v??? r??t ti???n
                                        </h1>
                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>S??? ti???n t???i ??a n???p r??t ng??y: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumAmountPerDay) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? ti???n t???i ??a c???a m???t l???n r??t: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumLimit) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? ti???n t???i thi???u c???a m???t l???n r??t: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.minimumLimit) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? l???n r??t t???i ??a c???a m???t ng??y: </b>
                                                <span>{card.transactionLimit.withdrawLimit.maximumTimePerDay} giao d???ch.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="4" className={"detail-card-body_wrap " + (isActive === "4" && "active")} >
                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "4") setIsActive("0"); else setIsActive("4") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Th??ng tin v??? chuy???n kho???n
                                        </h1>
                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>S??? ti???n t???i ??a c?? th??? chuy???n trong m???t ng??y: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumAmountPerDay) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? ti???n t???i ??a c?? th??? chuy???n trong m???t l???n: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumLimit) + " ??"}</span>
                                            </div>
                                            <div>
                                                <b>S??? l???n c?? th??? chuy???n trong m???t ng??y: </b>
                                                <span>{card.transactionLimit.transferLimit.maximumTimePerDay} giao d???ch.</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <h1>Something went wrong! Try again. We're so sorry this convenient.</h1>
                    }

                </div>
                {userInfo && userInfo.role === "admin" ? null : 
                    <>
                        {userInfo !== null ? <div className="detail-card-footer" onClick={HandleRegisterClick}><button className="btn dang-ky-ngay">????ng k?? ngay</button></div> :
                            <div className="detail-card-footer">
                                <button className="btn dang-ky-ngay" disabled>????ng k?? ngay</button><br />
                                <div>H??y <Link to="/login" className="lazyyy">????ng nh???p</Link> ????? c?? th??? ????ng k?? d???ch v??? c???a ch??ng t??i!</div>
                            </div>
                        }
                    </>
                }
            </div>
            <Policy />
        </div>
    )
}

export default DetailCardPage
