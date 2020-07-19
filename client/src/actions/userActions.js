import axios from "axios";
import Cookie from 'js-cookie'
import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL 
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST})
    try{
        const { data } = await axios.post('/api/users/signin',{email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        Cookie.set('userInfo', JSON.stringify(data))
    } catch(err){
        dispatch({type: USER_SIGNIN_FAIL, payload: err.message})
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST})
    try{
        const {data}= await axios.post('/api/users/register',{name, email, password})
        dispatch({type: USER_REGISTER_SUCCESS, payload:data})
        Cookie.set('userInfo', JSON.stringify(data))
    } catch(err){
        dispatch({type: USER_REGISTER_FAIL, payload:err.message})
    }
}

export { signin, register }