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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

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
        dispatch(signin(email, password))
    }

    return (
        <div className='contentCenter'>
            <form className='form' onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <FormFieldHeader text={'Signin'}/>
                    <FormFieldMessages 
                        loading={loading}
                        error={error}
                    />
                    <FormField 
                        name={'email'} 
                        value={email} 
                        type={'email'} 
                        setState={setEmail}
                    />
                    <FormFieldPassword 
                        label={'Password'}
                        setShowPassword={setShowPassword}
                        showPassword={showPassword}
                        setState={setPassword}
                        value={password}
                        setPasswordFocus={setPasswordFocus}
                    />
                    <FormFieldButton text={'Signin'}/>
                    <li className='toRegister'>   
                        New to ePlaza360?
                    </li>
                    <li>
                        <Link to={redirect === '/' ? 'register': 'register?redirect='+redirect} className='button secondary' >Create Account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}