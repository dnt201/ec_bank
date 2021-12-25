import React from 'react'

import emvChip from '../../images/emv-chip.png'
import logo from '../../images/Logo.png'

import debitLogo from '../../images/j-debit-logo.png'
import masterLogo from '../../images/MasterCard-Logo.png'
import visaLogo from '../../images/visa-card-vector-logo.png'

import "./style.css"


const Card = (props) => {
  return (
    <div className="card">
      <div className="card__front card__part" style={{
        backgroundImage: `url(${props.image})`
      }}>
        <span className="card__front-name">NDTH Bank</span>
        <img className="card__front-logo" src={logo} alt="" />
        <br />
        <img className="card__front-chip" src={emvChip} alt="a" />
        <p className="card_front-number">{props.number ? <>{props.number.slice(0, 4)} {props.number.slice(4, 8)} {props.number.slice(8, 12)} {props.number.slice(12, 16)}</> : "0000 0000 0000 0000"}</p>
        <div className="card__front-wrap"><span className="card__front-title">GOOD THRU: </span> <span className="card__front-exp"> {props.goodthru || "MM/YY"}</span></div>
        <span className="card__front-name-hold">{props.name || "Name Holder"}</span>
        {props.type ? (props.type === "LocalDebitCard" ? <img className="card__front-type-card" src={debitLogo} alt="" /> : 
          (props?.number?.slice(0, 1) === "4" ? <img className="card__front-type-card" src={visaLogo} alt="" />: 
          (props?.number?.slice(0, 1) === "5" ? <img className="card__front-type-card" src={masterLogo} alt="" /> : 
          (props.type === "GlobalCreditCard" ? <img className="card__front-type-card" src={visaLogo} alt=""/> :
          (props.type === "GlobalDebitCard" ? <img className="card__front-type-card" src={masterLogo} alt="" /> : null) 
          ))))
          : null}
      </div>

      <div className="card__back card__part" style={{
        backgroundImage: `url(${props.image})`
      }}>
        <div className="card__black-line"></div>
        <div className="card__back-content">
          <div className="card__secret">
            <p className="card__secret-last">{props.type === "GlobalCreditCard"  ? props.ccv ? props.ccv : "000" : null} </p>
            
          </div>
          <p className="card__back-rules" >Thẻ này được phát hành bởi NDTH Bank. Việc sử dụng tấm thẻ này phải tuân thủ các điều khoản và điều kiện do NDTH Bank quy định/ This card is issued by NDTH Bank. The use of this card is governed by terms and conditions set by NDTH Bank.</p>
          <p className="card__back-hotline">Hotline: 1800 101082</p>

        </div>
      </div>

    </div>
  )
}

export default Card
