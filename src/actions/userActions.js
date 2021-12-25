// import axios from '../axios'
import axios from 'axios'
import axios1 from 'axios'
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,

  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,

  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,

  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,

  USER_VIEW_ALL_CARD_FAIL,
  USER_VIEW_ALL_CARD_REQUEST,
  USER_VIEW_ALL_CARD_SUCCESS,

  USER_VIEW_MY_CARD_DETAIL_REQUEST,
  USER_VIEW_MY_CARD_DETAIL_SUCCESS,
  USER_VIEW_MY_CARD_DETAIL_FAIL,


  USER_ADD_MONEY_REQUEST,
  USER_ADD_MONEY_FAIL,
  USER_ADD_MONEY_SUCCESS,

  USER_TRANSFER_REQUEST,
  USER_TRANSFER_FAIL,
  USER_TRANSFER_SUCCESS,

  USER_WITHDRAW_REQUEST,
  USER_WITHDRAW_FAIL,
  USER_WITHDRAW_SUCCESS,

  USER_VIEW_MY_LOG_REQUEST,
  USER_VIEW_MY_LOG_SUCCESS,
  USER_VIEW_MY_LOG_FAIL,


  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,

  USER_REGISTER_CARD_REQUEST,
  USER_REGISTER_CARD_SUCCESS,
  USER_REGISTER_CARD_FAIL,

  USER_CHANGE_PIN_REQUEST,
  USER_CHANGE_PIN_SUCCESS,
  USER_CHANGE_PIN_FAIL,

  USER_VIEW_ALL_LOG_REQUEST,
  USER_VIEW_ALL_LOG_SUCCESS,
  USER_VIEW_ALL_LOG_FAIL,


} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token: data.token
    })
    localStorage.setItem('userInfo', JSON.stringify(data.user))
    localStorage.setItem('userToken', data.token)
    document.location.href = '/user'
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userToken')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}
export const updateUserPassword = (oldPassword, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put('api/v1/password/update', { oldPassword, password, confirmPassword }, config)

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data.data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token: data.token
    })
  } catch (error) {

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}
export const updateUserProfile = (IdNumber, IssueDate, IssuePlace, job, place, salary, name, birthDay, phoneNumber, address) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put('/api/v1/me/update', {
      personalID: {
        IdNumber: IdNumber,
        IssueDate: IssueDate,
        IssuePlace: IssuePlace
      },
      job: {
        job: job,
        place: place,
        salary: salary
      },
      name: name,
      birthDay: birthDay,
      phoneNumber: phoneNumber,
      address: address
    }, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
    })
    localStorage.setItem('userInfo', JSON.stringify(data.user))
  } catch (error) {

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}
export const register = (name, email, password, birthDay, IdNumber, IssueDate, IssuePlace, job, place, salary, phoneNumber, address) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/v1/register',
      {
        name,
        email,
        password,
        birthDay,
        personalID: { IdNumber, IssueDate, IssuePlace },
        job: { job, place, salary },
        phoneNumber,
        address
      },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      user: data.user,
      token: data.token
    })



    localStorage.setItem('userInfo', JSON.stringify(data.user))
    localStorage.setItem('userToken', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const viewAllCard = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_VIEW_ALL_CARD_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      '/api/v1/myCard',
      config
    )
    dispatch({
      type: USER_VIEW_ALL_CARD_SUCCESS,
      payload: data.listAccount,
    })
  } catch (error) {
    dispatch({
      type: USER_VIEW_ALL_CARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const viewMyCardDetail = (category, cardNumber) => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_VIEW_MY_CARD_DETAIL_REQUEST,
    })
    const {
      userLogin: { userToken },
    } = getState()
    console.log(userToken)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('/api/v1/cardlog', { category, cardNumber })
    const { data } = await axios.get(`/api/v1/cardlog?category=${category}&&cardNumber=${cardNumber}`, { a: "a" }, config)
    dispatch({
      type: USER_VIEW_MY_CARD_DETAIL_SUCCESS,
      payload: data.Info,
    })
  } catch (error) {
    dispatch({
      type: USER_VIEW_MY_CARD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const add_money = (idCart, amount1) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ADD_MONEY_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const getRates = await axios1.get('https://api.exchangerate-api.com/v4/latest/USD')
    const rates = getRates.data.rates["VND"];


    let cardNumber = idCart;
    let amount = amount1 * rates;
    console.log(cardNumber, amount)
    const { data } = await axios.post('/api/v1/chargeAccount', { cardNumber, amount }, config)

    dispatch({
      type: USER_ADD_MONEY_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: USER_ADD_MONEY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const transfer = (typeTransaction, cardNumber, amount, toAccount) => async (dispatch) => {
  try {
    dispatch({
      type: USER_TRANSFER_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log("typeTransaction,cardNumber,amount,toAccount")
    console.log("post", '/api/v1/makeTransaction', typeTransaction, cardNumber, amount, toAccount)
    const { data } = await axios.post('/api/v1/makeTransaction', { typeTransaction, cardNumber, amount, toAccount }, config)

    dispatch({
      type: USER_TRANSFER_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: USER_TRANSFER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const withdraw = (typeTransaction, cardNumber, amount) => async (dispatch) => {
  try {
    dispatch({
      type: USER_WITHDRAW_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log("typeTransaction,cardNumber,amount")
    console.log("post", '/api/v1/makeTransaction', typeTransaction, cardNumber, amount)
    const { data } = await axios.post('/api/v1/makeTransaction', { typeTransaction, cardNumber, amount }, config)

    dispatch({
      type: USER_WITHDRAW_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: USER_WITHDRAW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const registerCard = (type, category) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_CARD_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(`/api/v1/card/createCard`, { type, category })
    const { data } = await axios.post(`/api/v1/card/createCard`, { type, category }, config)

    dispatch({
      type: USER_REGISTER_CARD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_CARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const changePin = (oldPinCode, newPinCode, BankAccount) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CHANGE_PIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(`/api/v1/card/createCard`, { oldPinCode, newPinCode, BankAccount })
    const { data } = await axios.put(`/api/v1/card/changePin`, { oldPinCode, newPinCode, BankAccount }, config)

    dispatch({
      type: USER_CHANGE_PIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_CHANGE_PIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const viewMyLog = (oldPinCode, newPinCode, BankAccount) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VIEW_MY_LOG_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(`/api/v1/card/createCard`, { oldPinCode, newPinCode, BankAccount })
    const { data } = await axios.get(`/api/v1/mylog`, config)

    dispatch({
      type: USER_VIEW_MY_LOG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_VIEW_MY_LOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


// ----------------- Admin -----------------
export const all_user = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/api/v1/admin/users', config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.users,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/v1/admin/user/${id}`, config)


    dispatch({
      type: USER_DETAILS_SUCCESS,
      user: data.user,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}
export const updateUser = (id, IdNumber, IssueDate, IssuePlace, job, place, salary, name, birthDay, phoneNumber, address, role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/v1/admin/user/${id}`,
      {
        personalID: {
          IdNumber,
          IssueDate,
          IssuePlace,
        },
        job: {
          job,
          place,
          salary,
        },
        name,
        birthDay,
        phoneNumber,
        address,
        role,
      }

      , config)

    dispatch({ type: USER_UPDATE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log("delete")
    await axios.delete(`/api/v1/admin/user/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const viewAllLog = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_VIEW_ALL_LOG_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(`/api/v1/admin/logs`, config)
    console.log(data)

    dispatch({
      type: USER_VIEW_ALL_LOG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_VIEW_ALL_LOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
