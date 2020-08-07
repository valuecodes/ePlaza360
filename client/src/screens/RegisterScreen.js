import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { 
    FormFieldHeader, 
    FormField, 
    FormFieldPassword, 
    FormFieldRePassword, 
    FormFieldButton,
    FormFieldMessages
} from '../components/FormComponents'

export default function RegisterScreen(props) {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: ''
    })

    const [passwordFocus, setPasswordFocus] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState([])

    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error } = userRegister

    const dispatch = useDispatch()
    const redirect = props.location.search?props.location.search.split('=')[1]:'/'

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userInfo])
    
    const submitHandler=(e)=>{
        e.preventDefault()

        let errors=[];
        if(user.password.length<6) errors.push('Password must be atleast 6 characters long')
        if(user.password!==user.rePassword) errors.push('Re-password is wrong')
        
        if(errors.length===0){
            dispatch(register(
                user.name, 
                user.email, 
                user.password, 
                user.rePassword))
        }else{
            setFormErrors(errors)
        }
    }

    return (
        <div className='contentCenter'>
            <form className='form' onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <FormFieldHeader text={'Create Account'}/>
                    <FormFieldMessages 
                        loading={loading}
                        error={error}
                        formErrors={formErrors}
                    />
                    <FormField 
                        name={'name'} 
                        value={user.name} 
                        type={'text'} 
                        state={user}
                        setState={setUser}
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
                    <PasswordStrengthMeter 
                        password={user.password} 
                        passwordFocus={passwordFocus}
                    />
                    <FormFieldRePassword
                        label={'Re-Enter Password'}
                        equals={user.password===user.rePassword}
                        showPassword={showPassword}
                        setState={setUser}
                        state={user}                        
                        value={user.rePassword}
                        name={'rePassword'}
                    />
                    <FormFieldButton text={'Register'}/>
                    <li className='toRegister'>
                        Already have an account?
                    </li>
                    <button className='button secondary fullWidth' >
                        <Link to={redirect === '/' ? 'signin': 'signin?redirect='+redirect} >Sign-in</Link>
                    </button>
                </ul>
            </form>
        </div>
    )
}