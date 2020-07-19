import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
import Cookie from 'js-cookie'

const userInfo = Cookie.getJSON('userInfo') || undefined

const initialState = {userSignin:{userInfo}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store