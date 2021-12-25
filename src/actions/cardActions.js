// import axios from '../axios'
import axios from 'axios'
import axios1 from 'axios'

import {


  ALL_CARD_LIST_REQUEST,
  ALL_CARD_LIST_SUCCESS,
  ALL_CARD_LIST_FAIL,

  CARD_DETAIL_REQUEST,
  CARD_DETAIL_SUCCESS,
  CARD_DETAIL_FAIL,

  CARD_CHECK_PIN_REQUEST,
  CARD_CHECK_PIN_SUCCESS,
  CARD_CHECK_PIN_FAIL,

  GET_RATES_REQUEST,
  GET_RATES_SUCCESS,
  GET_RATES_FAIL,

  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARD_CREATE_FAIL,


} from '../constants/cardConstants'

export const getAllCard = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_CARD_LIST_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const GlobalDebitCard = await axios.get('/api/v1/category?category=GlobalDebitCard', config)
    const GlobalCreditCard = await axios.get('/api/v1/category?category=GlobalCreditCard', config)
    const LocalDebitCard = await axios.get('/api/v1/category?category=LocalDebitCard', config)
    dispatch({
      type: ALL_CARD_LIST_SUCCESS,
      payload:
        [{
          name: "Thẻ ghi nợ quốc tế",
          path: "GlobalDebitCard",
          children: GlobalDebitCard.data.listCard,
        },
        {
          name: "Thẻ tín dụng quốc tế",
          path: "GlobalCreditCard",
          children: GlobalCreditCard.data.listCard,
        },
        {
          name: "Thẻ ghi nợ nội địa",
          path: "LocalDebitCard",
          children: LocalDebitCard.data.listCard,
        }
        ]
    })
  } catch (error) {
    dispatch({
      type: ALL_CARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getRates = (idCur) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RATES_REQUEST,
    })
    const getRates = await axios1.get('https://api.exchangerate-api.com/v4/latest/USD')
    const rates = getRates.data.rates[`${idCur}`];
    dispatch({
      type: GET_RATES_SUCCESS,
      payload: rates,
    })

  } catch (error) {
    dispatch({
      type: GET_RATES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getDetailCard = (name, category1) => async (dispatch) => {
  try {
    dispatch({
      type: CARD_DETAIL_REQUEST,
    })
    const category = category1;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`/api/v1/category/info`, {
      params: {
        name,
        category
      },
    }, config)

    dispatch({
      type: CARD_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const checkPin = (cardNumber, PIN) => async (dispatch) => {
  try {
    dispatch({
      type: CARD_CHECK_PIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(`/api/v1/checkPin`, { cardNumber, PIN })
    const { data } = await axios.post(`/api/v1/checkPin`, { cardNumber, PIN }, config)

    dispatch({
      type: CARD_CHECK_PIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_CHECK_PIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCardLocalDebit = (name, typeCustomer, pay_minimumLimit, pay_maximumLimit, pay_maximumAmountPerDay, pay_maximumTimePerDay, type, draw_minimumLimit, draw_maximumLimit, draw_maximumAmountPerDay, draw_maximumTimePerDay, transfer_maximumLimit, transfer_maximumAmountPerDay, transfer_maximumTimePerDay, transac_withdrawFee, transac_TransferFee, images) => async (dispatch) => {
  try {
    dispatch({
      type: CARD_CREATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log(`/api/v1/admin/category/new`, name, typeCustomer, pay_minimumLimit, pay_maximumLimit, pay_maximumAmountPerDay, pay_maximumTimePerDay, type, draw_minimumLimit, draw_maximumLimit, draw_maximumAmountPerDay, draw_maximumTimePerDay, transfer_maximumLimit, transfer_maximumAmountPerDay, transfer_maximumTimePerDay, transac_withdrawFee, transac_TransferFee, images)
    const { data } = await axios.post(`/api/v1/admin/category/new`,
      {
        "type": "LocalDebitCard",
        "info": {
          name,
          "typeCustomer":[typeCustomer],
          "transactionLimit": {
            "payLimit": {
              "minimumLimit": pay_minimumLimit,
                "maximumLimit": pay_maximumLimit,
                "maximumAmountPerDay": pay_maximumAmountPerDay,
                "maximumTimePerDay": pay_maximumTimePerDay
            },
            "withdrawLimit": {
              "minimumLimit": draw_minimumLimit,
              "maximumLimit": draw_maximumLimit,
              "maximumAmountPerDay": draw_maximumAmountPerDay,
              "maximumTimePerDay": draw_maximumTimePerDay
            },
            "transferLimit": {
              "maximumLimit": transfer_maximumLimit,
              "maximumAmountPerDay": transfer_maximumAmountPerDay,
              "maximumTimePerDay": transfer_maximumTimePerDay
            }
          },
          "transactionFee": {
            "withdrawFee": transac_withdrawFee,
            "transferFee": transac_TransferFee,
          },
          image: images
        }
      },
      config)

    dispatch({
      type: CARD_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const createCardGlobalDebit = (name,ranking,typeCustomer,pay_minimumLimit,pay_maximumLimit,pay_maximumAmountPerDay,pay_maximumTimePerDay,type,draw_minimumLimit,draw_maximumLimit,draw_maximumAmountPerDay,draw_maximumTimePerDay,transfer_maximumLimit,transfer_maximumAmountPerDay,transfer_maximumTimePerDay,transac_withdrawFee,transac_TransferFee,images) => async (dispatch) => {
  try {
    dispatch({
      type: CARD_CREATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log("/api/v1/admin/category/new",name)
    const { data } = await axios.post(`/api/v1/admin/category/new`, {
      "type": "GlobalDebitCard",
      "info": {
        name,
        ranking,
        "typeCustomer": [typeCustomer],
        "transactionLimit": {
          "payLimit": {
            "minimumLimit": pay_minimumLimit,
              "maximumLimit": pay_maximumLimit,
              "maximumAmountPerDay": pay_maximumAmountPerDay,
              "maximumTimePerDay": pay_maximumTimePerDay
          },
          "withdrawLimit": {
            "minimumLimit": draw_minimumLimit,
            "maximumLimit": draw_maximumLimit,
            "maximumAmountPerDay": draw_maximumAmountPerDay,
            "maximumTimePerDay": draw_maximumTimePerDay
          },
          "transferLimit": {
            "maximumLimit": transfer_maximumLimit,
            "maximumAmountPerDay": transfer_maximumAmountPerDay,
            "maximumTimePerDay": transfer_maximumTimePerDay
          }
        },
        "transactionFee": {
          "withdrawFee": transac_withdrawFee,
          "transferFee": transac_TransferFee,
        },
        image: images
      }
    }, config)

    dispatch({
      type: CARD_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const createCardGlobalCredit = (name,ranking,cardStatementDate,paymentDate,minimumPayoutRate,creditLimit,interestRate,lazy,lateFee,images) => async (dispatch) => {
  try {
    dispatch({
      type: CARD_CREATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let info= {
      "name": name,
      "ranking": ranking,
      "cardStatementDate": cardStatementDate,
      "paymentDate": paymentDate,
      "minimumPayoutRate": minimumPayoutRate,
      "creditLimit": creditLimit,
      "interestRate": interestRate,
      "transactionFee": {
          "withdrawLimit": lazy,
          "lateFee": lateFee
      },
      "image": " "
    }
    console.log(info)
    const { data } = await axios.post(`/api/v1/admin/category/new`, 
    { 
      "type": "GlobalCreditCard",
      "info": {
        "name": name,
        "ranking": ranking,
        "cardStatementDate": cardStatementDate,
        "paymentDate": paymentDate,
        "minimumPayoutRate": minimumPayoutRate,
        "creditLimit": creditLimit,
        "interestRate": interestRate,
        "transactionFee": {
            "withdrawLimit": lazy,
            "lateFee": lateFee
        },
        "image": images
      }
    
    }, 
    config)

    dispatch({
      type: CARD_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CARD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}