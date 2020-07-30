import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_SUCCESS,
    PRODUCT_REVIEW_SAVE_FAIL,
} from "../constants/productConstants";
import axios from "axios";

const listProducts = (category='', searchKeyWord='', sortOrder='') => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/api/products?category=${category}&searchKeyword=${searchKeyWord}&sortOrder=${sortOrder}`)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})    
    } catch(err){
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.message})
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_SAVE_REQUEST})
        const {userSignin: {userInfo}} = getState()
        if(!product.id){
            const {data} = await axios.post('/api/products',product,{headers:{
                'Authorization': `Bearer${userInfo.token}`
            }})            
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }else{
            const {data} = await axios.put('/api/products/'+product.id,product,{headers:{
                'Authorization': `Bearer${userInfo.token}`
            }})     
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }

    } catch (err){
        dispatch({type: PRODUCT_SAVE_FAIL, payload: err.message})
    }
}

const detailsProduct = (productId) => async (dispatch) =>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${productId}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (err){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: err.message})
    }
}

const deleteProduct = (productId) => async (dispatch, getState) =>{
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST})
        const {userSignin: {userInfo}} = getState()
        const { data } = await axios.delete(`/api/products/${productId}`,{headers:{
            'Authorization': `Bearer${userInfo.token}`
        }})
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload:data})
    } catch(err){
        dispatch({type: PRODUCT_DELETE_FAIL, payload: err.message})
    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try{
        const {userSignin:{userInfo:{token}}} = getState()
        dispatch({type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review})
        const {data} = await axios.post(`/api/products/${productId}/reviews`, review,{
            headers:{
                Authorization: 'Bearer'+token
            }
        })
        dispatch({type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data})
    } catch(err){
        dispatch({type: PRODUCT_REVIEW_SAVE_FAIL, payload: err.message})
    }
}

export{ 
    listProducts, 
    detailsProduct, 
    saveProduct, 
    deleteProduct, 
    saveProductReview 
}