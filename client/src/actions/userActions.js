import axios from "axios";
import Cookie from 'js-cookie'
import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
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

const logout = () => (dispatch) =>{
    Cookie.remove('userInfo')
    dispatch({type: USER_LOGOUT})
}

const update = (updatedUserInfo) => async (dispatch, getState) =>{
    try{
        dispatch({type: USER_UPDATE_REQUEST, payload:updatedUserInfo})
        const {userSignin:{userInfo}} = getState()
        const {data:{data}} = await axios.put('/api/users/'+updatedUserInfo.userId,updatedUserInfo,{headers:{
            Authorization: 'Bearer'+userInfo.token
        }})
        dispatch({type: USER_UPDATE_SUCCESS, payload: data})
        Cookie.set('userInfo', JSON.stringify(data))
    } catch(err){
       dispatch({type: USER_UPDATE_FAIL}) 
    }
}

export { signin, register, logout, update }