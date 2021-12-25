import {
    userLoginReducer,
    userRegisterReducer,
    userUpdatePasswordReducer,
    userUpdateProfileReducer,

    userViewAllCardReducer,
    viewMyCardDetailReducer,
    
    addMoneyReducer,
    transferReducer,
    withdrawReducer,
    changePinReducer,
    userRegisterCardReducer,
    viewMyLogReducer,

    listUserReducer,
    userDetailsReducer,
    userUpdateReducer,
    userDeleteReducer,
    viewAllLogReducer
} from "./userReducer"

import {
    allCardReducer,
    getDetailCard,
    checkPinReducer,
    getRatesReducer,
    createCardReducer,
}
from './cardReducer'


import { combineReducers } from "redux"

const rootReducer = combineReducers({
    //User
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    userUpdateProfile: userUpdateProfileReducer,

    userViewAllCard:userViewAllCardReducer,
    viewMyCardDetail:viewMyCardDetailReducer,

    listUser:listUserReducer,
    userDetail: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    
    addMoney:addMoneyReducer,
    transfer:transferReducer,
    changePin:changePinReducer,
    userRegisterCard: userRegisterCardReducer,
    viewMyLog:viewMyLogReducer,

    allCard:allCardReducer,
    detailCard:getDetailCard,
    checkPin:checkPinReducer,
    getRates:getRatesReducer,
    createCard:createCardReducer,
    withdraw:withdrawReducer,
    viewAllLog:viewAllLogReducer,

})
export default rootReducer;