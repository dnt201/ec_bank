import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../components/banner/Banner'
import Policy from '../components/policy/Policy'
import { Link } from 'react-router-dom'
import Loader from '../components/loader/Loader'


import './HomePage.css'

const HomePage = () => {
    console.log(process.env)
    const allCard = useSelector((state) => state.allCard);
    return (
        <>{allCard.loading ? <div className="lazy_app"><Loader/></div> :
            <div>
                <Banner />
                <div className="wrap-list-the flex_column_center w100">
                    <h1 className=" mt_16px mb_16px ">Dịch vụ thẻ</h1>
                    <div className="list-the w100">
                        <div className="item-the">
                            <img src="https://www.agribank.com.vn/wcm/connect/fada893d-f59a-4bdd-823f-3bc6dae812d3/Visa+Debit+Stand-01-01.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-fada893d-f59a-4bdd-823f-3bc6dae812d3-nuPSEmT" alt="" />
                            <h3>Thẻ ghi nợ quốc tế</h3>
                            <span>Hoàn toàn chủ động chi tiêu từ việc thanh toán khi mua sắm, ăn uống và giải trí khắp Việt Nam và thể giới.</span>
                            <Link to="/GlobalDebitCard">Xem chi tiết</Link>
                        </div>
                        <div className="item-the">
                            <img src="https://www.bidv.com.vn/wps/wcm/connect/264b7a07-04c6-4a38-b28c-8aa829796864/BIDV+Card+_Visa+infinite.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-264b7a07-04c6-4a38-b28c-8aa829796864-mp.PReX" alt="" />
                            <h3>Thẻ ghi tín dụng quốc tế</h3>
                            <span>Trải nghiệm phong cách sống hiện đại và tận hưởng các dịch vụ cao cấp với Thẻ tín dụng NDHT.</span>
                            <Link to="/GlobalCreditCard">Xem chi tiết</Link>
                        </div>
                        <div className="item-the">
                            <img src="https://static.vietbank.com.vn/web/CardWebsite/product/the-noi-dia-vietbank.png" alt="" />
                            <h3>Thẻ ghi nợ nội địa</h3>
                            <span>Giao dịch và thanh toán dễ dàng tại hàng nghìn máy ATM và điểm chấp nhận thanh toán thẻ trên toàn quốc .</span>
                            <Link to="/GlobalCreditCard">Xem chi tiết</Link>
                        </div>

                    </div>
                </div>
                <Policy />
            </div>
        }</>

    )
}

export default HomePage
