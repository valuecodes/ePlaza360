import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import Cookie from 'js-cookie'
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    myOrderListReducer, 
    orderListReducer, 
    orderDeleteReducer, 
    orderStatusReducer
} from './reducers/orderReducers';


const cartItems = Cookie.getJSON('cartItems') || []
const userInfo = Cookie.getJSON('userInfo') || undefined

const initialState = {cart:{cartItems,shipping:{},payment:{},trackPackage:{}}, userSignin:{userInfo}}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReviewSave: productReviewSaveReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderStatus: orderStatusReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store