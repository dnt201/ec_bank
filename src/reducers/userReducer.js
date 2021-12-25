import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,

  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,

  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_RESET,

  USER_VIEW_ALL_CARD_FAIL,
  USER_VIEW_ALL_CARD_REQUEST,
  USER_VIEW_ALL_CARD_SUCCESS,

  USER_VIEW_MY_CARD_DETAIL_REQUEST,
  USER_VIEW_MY_CARD_DETAIL_SUCCESS,
  USER_VIEW_MY_CARD_DETAIL_FAIL,


  USER_ADD_MONEY_REQUEST,
  USER_ADD_MONEY_SUCCESS,
  USER_ADD_MONEY_FAIL,

  USER_TRANSFER_REQUEST,
  USER_TRANSFER_SUCCESS,
  USER_TRANSFER_FAIL,

  USER_WITHDRAW_REQUEST,
  USER_WITHDRAW_FAIL,
  USER_WITHDRAW_SUCCESS,


  USER_VIEW_MY_LOG_REQUEST,
  USER_VIEW_MY_LOG_SUCCESS,
  USER_VIEW_MY_LOG_FAIL,

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,

  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,

  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,

  USER_CHANGE_PIN_REQUEST,
  USER_CHANGE_PIN_SUCCESS,
  USER_CHANGE_PIN_FAIL,
  USER_CHANGE_PIN_RESET,

  
  USER_REGISTER_CARD_REQUEST,
  USER_REGISTER_CARD_SUCCESS,
  USER_REGISTER_CARD_FAIL,
  USER_REGISTER_CARD_RESET,


  
  USER_VIEW_ALL_LOG_REQUEST,
  USER_VIEW_ALL_LOG_SUCCESS,
  USER_VIEW_ALL_LOG_FAIL,
  

} from '../constants/userConstants'
export const userLoginReducer = (state = { isLogin: false }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.user, isLogin: true }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, isLogin: false }
    case USER_LOGOUT:
      return { isLogin: false }
    default:
      return state
  }
}
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload.user, userToken: action.payload.userToken }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return {}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true }
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PASSWORD_RESET:
      return {}
    default:
      return state
  }
}
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.user }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}
export const userViewAllCardReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VIEW_ALL_CARD_REQUEST:
      return { loading: true }
    case USER_VIEW_ALL_CARD_SUCCESS:
      return { loading: false, listCard: action.payload }
    case USER_VIEW_ALL_CARD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const viewMyCardDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VIEW_MY_CARD_DETAIL_REQUEST:
      return { loading: true }
    case USER_VIEW_MY_CARD_DETAIL_SUCCESS:
      return { loading: false, info: action.payload }
    case USER_VIEW_MY_CARD_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const addMoneyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_MONEY_REQUEST:
      return { loading: true }
    case USER_ADD_MONEY_SUCCESS:
      return { loading: false, success: true }
    case USER_ADD_MONEY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const transferReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TRANSFER_REQUEST:
      return { loading: true }
    case USER_TRANSFER_SUCCESS:
      return { loading: false, success: true }
    case USER_TRANSFER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const withdrawReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_WITHDRAW_REQUEST:
      return { loading: true }
    case USER_WITHDRAW_SUCCESS:
      return { loading: false, success: true }
    case USER_WITHDRAW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
} 
export const viewMyLogReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VIEW_MY_LOG_REQUEST:
      return { loading: true }
    case USER_VIEW_MY_LOG_SUCCESS:
      return { loading: false, success: true,numberofLogs:action.payload.numberofLogs,Logs:action.payload.Logs  }
    case USER_VIEW_MY_LOG_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
} 



export const changePinReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_PIN_REQUEST:
      return { loading: true }
    case USER_CHANGE_PIN_SUCCESS:
      return { loading: false, success: true }
    case USER_CHANGE_PIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_CHANGE_PIN_RESET:
      return {}
    default:
      return state
  }
}
export const userRegisterCardReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_CARD_REQUEST:
      return { loading: true }
    case USER_REGISTER_CARD_SUCCESS:
      return { loading: false, info: action.payload, success: true }
    case USER_REGISTER_CARD_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_CARD_RESET:
      return {}
    default:
      return state
  }
}

// --------------------------------ADMIN

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.user }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}
export const listUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, listUser: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return {}
    default:
      return state
  }
}
export const userUpdateReducer = (state = {}, action) => {

  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case USER_DELETE_RESET:
      return {}
    default:
      return state
  }
}


export const viewAllLogReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VIEW_ALL_LOG_REQUEST:
      return { loading: true }
    case USER_VIEW_ALL_LOG_SUCCESS:
      return { loading: false, success: true,numberofLogs:action.payload.numberofLogs,Logs:action.payload.Logs  }
    case USER_VIEW_ALL_LOG_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
} 
