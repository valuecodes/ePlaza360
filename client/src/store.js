import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'

const initialState = {}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store