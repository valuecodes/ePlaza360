import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { productListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'

const initialState = {}
const reducer = combineReducers({
    productList: productListReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store