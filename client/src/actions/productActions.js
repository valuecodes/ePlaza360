import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";
import axios from "axios";

const listProducts = () => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products')
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
        console.log(data)        
    } catch(err){
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.message})
        
    }
}

export{ listProducts }