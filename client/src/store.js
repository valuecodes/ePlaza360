import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import Cookie from 'js-cookie'
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON('cartItems') || []
const userInfo = Cookie.getJSON('userInfo') || undefined

const initialState = {cart:{cartItems,shipping:{},payment:{}}, products:[], userSignin:{userInfo}}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store