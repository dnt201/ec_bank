import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faMoneyCheckAlt, faCreditCard, faCommentDots } from '@fortawesome/free-solid-svg-icons'

import './Policy.css'

const Policy = () => {
    return (
        <div className="policy_container">
            <h1>Chính sách</h1>
            <div className="policy_list">
                <div className="police_item">
                    <FontAwesomeIcon icon={faCreditCard} className="icon" />
                    <p> Ưu Đãi - Hấp Dẫn</p>
                </div>
                <div className="police_item">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
                    <p> Thanh Toán - Tiện Lợi</p>
                </div>
                <div className="police_item">
                    <FontAwesomeIcon icon={faTruck} className="icon" />
                    <p> Chi nhánh trên toàn quốc</p>
                </div>
                <div className="police_item">
                    <FontAwesomeIcon icon={faCommentDots} className="icon" />
                    <p> Hỗ trợ dịch vụ 24/7</p>
                </div>
            </div>
        </div>
    )
}

export default Policy
