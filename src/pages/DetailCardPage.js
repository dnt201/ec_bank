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

                        {props.type && props.type === "GlobalDebitCard" ? <h1>Thẻ ghi nợ quốc tế</h1> :
                            props.type && props.type === "GlobalCreditCard" ? <h1>Thẻ tín dụng quốc tế</h1> :
                                props.type && props.type === "LocalDebitCard" ? <h1>Thẻ ghi nợ nội địa</h1> : null
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
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin chính
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
                                        <b>Phí chuyển khoản: </b>
                                        <span> {Intl.NumberFormat('en-IN').format(card.transactionFee.transferFee) + " %"}</span>
                                    </div>
                                    <div>
                                        <b>Phí rút tiền mặt: </b>
                                        <span> {Intl.NumberFormat('de-DE').format(card.transactionFee.withdrawFee) + " đ"} </span>
                                    </div>
                                </div>
                            </div>
                            <div key="2" className={"detail-card-body_wrap " + (isActive === "2" && "active")} >

                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "2") setIsActive("0"); else setIsActive("2") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin về thanh toán
                                </h1>

                                <div className="detail-card-body_body">
                                    <div>
                                        <b>Số tiền thanh toán trong một ngày: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumAmountPerDay) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số tiền tối đa của một giao dịch: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumLimit) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số tiền tối thiểu của một giao dịch: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.minimumLimit) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số giao dịch tối đa của một ngày: </b>
                                        <span>{card.transactionLimit.payLimit.maximumTimePerDay} giao dịch</span>
                                    </div>
                                </div>
                            </div>
                            <div key="3" className={"detail-card-body_wrap " + (isActive === "3" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "3") setIsActive("0"); else setIsActive("3") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin về rút tiền
                                </h1>
                                <div className="detail-card-body_body">
                                    <div>
                                        <b>Số tiền rút tối đa một ngày: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumAmountPerDay) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số tiền rút tối đa của một lần: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumLimit) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số tiền tối thiểu của một lần rút: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.minimumLimit) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số lần rút tối đa của một ngày: </b>
                                        <span>{card.transactionLimit.withdrawLimit.maximumTimePerDay} giao dịch.</span>
                                    </div>
                                </div>
                            </div>
                            <div key="4" className={"detail-card-body_wrap " + (isActive === "4" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "4") setIsActive("0"); else setIsActive("4") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin về chuyển khoản
                                </h1>
                                <div className="detail-card-body_body">
                                    <div>
                                        <b>Số tiền tối đa có thể chuyển trong một ngày: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumAmountPerDay) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số tiền tối đa có thể chuyển trong một lần: </b>
                                        <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumLimit) + " đ"}</span>
                                    </div>
                                    <div>
                                        <b>Số lần có thể chuyển trong một ngày: </b>
                                        <span>{card.transactionLimit.transferLimit.maximumTimePerDay} giao dịch.</span>
                                    </div>
                                </div>
                            </div>
                            <div key="5" className={"detail-card-body_wrap " + (isActive === "5" && "active")} >
                                <h1 className="detail-card-body_header" onClick={() => { if (isActive === "5") setIsActive("0"); else setIsActive("5") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Tính năng của sản phẩm
                                </h1>
                                <div className="detail-card-body_body">
                                    <div><span>Giao dịch tại hàng triệu điểm mạng lưới ATM/POS có biểu tượng MasterCard/Visa trên toàn cầu</span></div>
                                    <div><span>Thanh toán trực tuyến hàng hóa, dịch vụ tại các website có biểu tượng chấp nhận thanh toán bằng thẻ MasterCard/visa trên toàn cầu</span></div>
                                    <div><span>Giao dịch bằng bất kỳ loại tiền tệ nào.</span></div>
                                    <div><span>Công nghệ thẻ chip theo chuẩn EMV bảo mật tối ưu</span></div>
                                    <div><span>Quản lý chi tiêu hiệu quả, an toàn thông qua tin nhắn BSMS.</span></div>
                                    <div><span>Chuyển tiền liên ngân hàng 24/7 trên ATM của NDTH</span></div>
                                </div>
                            </div>
                        </>
                        :
                        props.type && props.type === "GlobalCreditCard" ?
                            card &&
                            <>
                                <div key="1" className={"detail-card-body_wrap " + (isActive === "1" && "active")} >
                                    <h1 className="detail-card-body_header" onClick={() => { if (isActive === "1") setIsActive("0"); else setIsActive("1") }}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin chính
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
                                            <b>Ngày sao kê: </b>
                                            <span> {card.cardStatementDate} </span>
                                        </div>
                                        <div>
                                            <b>Ngày đến hạn thanh toán sao kê: </b>
                                            <span> {card.paymentDate} ngày sau ngày sao kê</span>
                                        </div>
                                        <div>
                                            <b>Tỉ lệ thanh toán tối thiểu: </b>
                                            <span> {card.minimumPayoutRate}% </span>
                                        </div>
                                        <div>
                                            <b>Hạn mức tín dụng: </b>
                                            <span> {Intl.NumberFormat('de-DE').format(card.creditLimit) + " đ"}</span>
                                        </div>
                                        <div>
                                            <b>Lãi suất: </b>
                                            <span> {card.interestRate}% </span>
                                        </div>
                                    </div>
                                </div>
                                <div key="2" className={"detail-card-body_wrap " + (isActive === "2" && "active")} >
                                    <h1 className="detail-card-body_header" onClick={() => { if (isActive === "2") setIsActive("0"); else setIsActive("2") }}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Tính năng của sản phẩm
                                    </h1>
                                    <div className="detail-card-body_body">
                                        <div><span>Giao dịch tại hàng triệu điểm mạng lưới ATM/POS có biểu tượng MasterCard/Visa trên toàn cầu</span></div>
                                        <div><span>Thanh toán trực tuyến hàng hóa, dịch vụ tại các website có biểu tượng chấp nhận thanh toán bằng thẻ MasterCard/Visa trên toàn cầu</span></div>
                                        <div><span>Công nghệ bảo mật hiện đại và tiên tiến theo chuẩn quốc tế với nền tảng công nghệ EMV contact và contactless cùng giải pháp xác thực 3D-Secure cho giao dịch thanh toán trực tuyến</span></div>
                                        <div><span>Công nghê thẻ Quick Read (các thông tin thẻ ở mặt sau): thuận tiện khi giao dịch online </span></div>
                                        <div><span>Bảo hiểm toàn cầu với giá trị lên tới 11,65 tỷ đồng</span></div>
                                    </div>
                                </div>
                                <div key="3" className={"detail-card-body_wrap " + (isActive === "3" && "active")} >
                                    <h1 className="detail-card-body_header" onClick={() => { if (isActive === "3") setIsActive("0"); else setIsActive("3") }}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Quy trình phát hành thẻ
                                    </h1>
                                    <div className="detail-card-body_body">
                                        <div><span>Tiện lợi, nhanh chóng, tức thời!</span></div>
                                        <div><span>Đạt đủ các điều kiện, tiêu chi của thẻ!</span></div>
                                        <div><span>Mọi người dùng, mọi đối tượng!</span></div>
                                        <div><span>Hỗ trợ 24/7/365 tại các chi nhánh của NDTH Bank</span></div>
                                    </div>
                                </div>
                            </>
                            :
                            props.type && props.type === "LocalDebitCard" ?
                                card &&
                                <>
                                    <div key="1" className={"detail-card-body_wrap " + (isActive === "1" && "active")} >
                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "1") setIsActive("0"); else setIsActive("1") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin chính
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
                                                <b>Phí chuyển khoản: </b>
                                                <span> {Intl.NumberFormat('en-IN').format(card.transactionFee.transferFee) + " %"}</span>
                                            </div>
                                            <div>
                                                <b>Phí rút tiền mặt: </b>
                                                <span> {Intl.NumberFormat('de-DE').format(card.transactionFee.withdrawFee) + " đ"} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="2" className={"detail-card-body_wrap " + (isActive === "2" && "active")} >

                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "2") setIsActive("0"); else setIsActive("2") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin về thanh toán
                                        </h1>

                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>Số tiền có thể thanh toán: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumAmountPerDay) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số tiền tối đã của một giao dịch: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.maximumLimit) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số tiền tối thiểu của một giao dịch: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.payLimit.minimumLimit) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số giao dịch tối đa của một ngày: </b>
                                                <span>{card.transactionLimit.payLimit.maximumTimePerDay} giao dịch</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="3" className={"detail-card-body_wrap " + (isActive === "3" && "active")} >
                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "3") setIsActive("0"); else setIsActive("3") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin về rút tiền
                                        </h1>
                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>Số tiền tối đa nạp rút ngày: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumAmountPerDay) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số tiền tối đa của một lần rút: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.maximumLimit) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số tiền tối thiểu của một lần rút: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.withdrawLimit.minimumLimit) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số lần rút tối đa của một ngày: </b>
                                                <span>{card.transactionLimit.withdrawLimit.maximumTimePerDay} giao dịch.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="4" className={"detail-card-body_wrap " + (isActive === "4" && "active")} >
                                        <h1 className="detail-card-body_header" onClick={() => { if (isActive === "4") setIsActive("0"); else setIsActive("4") }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="lazy_css_icon_card_detail" /> <FontAwesomeIcon icon={faMinusCircle} className="lazy_css_icon_card_detail" /> Thông tin về chuyển khoản
                                        </h1>
                                        <div className="detail-card-body_body">
                                            <div>
                                                <b>Số tiền tối đa có thể chuyển trong một ngày: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumAmountPerDay) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số tiền tối đa có thể chuyển trong một lần: </b>
                                                <span>{Intl.NumberFormat('de-DE').format(card.transactionLimit.transferLimit.maximumLimit) + " đ"}</span>
                                            </div>
                                            <div>
                                                <b>Số lần có thể chuyển trong một ngày: </b>
                                                <span>{card.transactionLimit.transferLimit.maximumTimePerDay} giao dịch.</span>
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
                        {userInfo !== null ? <div className="detail-card-footer" onClick={HandleRegisterClick}><button className="btn dang-ky-ngay">Đăng ký ngay</button></div> :
                            <div className="detail-card-footer">
                                <button className="btn dang-ky-ngay" disabled>Đăng ký ngay</button><br />
                                <div>Hãy <Link to="/login" className="lazyyy">đăng nhập</Link> để có thể đăng ký dịch vụ của chúng tôi!</div>
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
