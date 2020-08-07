import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions';
import { 
    FormFieldHeader, 
    FormField, 
    FormFieldPassword, 
    FormFieldButton, 
    FormFieldMessages 
} from '../components/FormComponents'

export default function SigninScreen(props) {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocus ,setPasswordFocus] = useState(false)

    const userSignin = useSelector(state => state.userSignin)
    const {loading, error, userInfo } = userSignin
    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split("=")[1]:'/';
    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);
    
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(signin(user.email, user.password))
    }

    return (
        <div className='contentCenter'>
            <form className='form' onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <FormFieldHeader 
                        text={'Signin'}
                    />
                    <FormFieldMessages 
                        loading={loading}
                        error={error}
                    />
                    <FormField 
                        name={'email'} 
                        value={user.email} 
                        type={'email'} 
                        state={user}
                        setState={setUser}
                    />
                    <FormFieldPassword 
                        label={'Password'}
                        setShowPassword={setShowPassword}
                        showPassword={showPassword}
                        state={user}
                        setState={setUser}
                        value={user.password}
                        setPasswordFocus={setPasswordFocus}
                    />
                    <FormFieldButton text={'Signin'}/>
                    <li className='toRegister'>   
                        New to ePlaza360?
                    </li>
                    <button className='button secondary fullWidth'>
                        <Link to={redirect === '/' ? 'register': 'register?redirect='+redirect}  >Create Account</Link>
                    </button>
                </ul>
            </form>
        </div>
    )
}