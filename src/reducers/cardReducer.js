import {
  ALL_CARD_LIST_REQUEST,
  ALL_CARD_LIST_SUCCESS,
  ALL_CARD_LIST_FAIL,

  CARD_DETAIL_REQUEST,
  CARD_DETAIL_SUCCESS,
  CARD_DETAIL_FAIL,

  
  GET_RATES_REQUEST,
  GET_RATES_SUCCESS,
  GET_RATES_FAIL,
   
  CARD_CHECK_PIN_REQUEST,
  CARD_CHECK_PIN_SUCCESS,
  CARD_CHECK_PIN_FAIL,
  CARD_CHECK_PIN_RESET,

  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARD_CREATE_FAIL,
 

} from '../constants/cardConstants'

export const allCardReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_CARD_LIST_REQUEST:
      return { loading: true }
    case ALL_CARD_LIST_SUCCESS:
      return { loading: false, listCard: action.payload, success: true }
    case ALL_CARD_LIST_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const getDetailCard = (state = {}, action) => {
  switch (action.type) {
    case CARD_DETAIL_REQUEST:
      return { loading: true }
    case CARD_DETAIL_SUCCESS:
      return { loading: false, cardInfo: action.payload, success: true }
    case CARD_DETAIL_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}
export const checkPinReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_CHECK_PIN_REQUEST:
      return { loading: true }
    case CARD_CHECK_PIN_SUCCESS:
      return { loading: false, success: true }
    case CARD_CHECK_PIN_FAIL:
      return { loading: false, error: action.payload, success: false }
    case CARD_CHECK_PIN_RESET:
      return {}
    default:
      return state
  }
}

export const getRatesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RATES_REQUEST:
      return { loading: true }
    case GET_RATES_SUCCESS:
      return { loading: false, success: true, rates: action.payload }
    case GET_RATES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createCardReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_CREATE_REQUEST:
      return { loading: true }
    case CARD_CREATE_SUCCESS:
      return { loading: false, success: true }
    case CARD_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
