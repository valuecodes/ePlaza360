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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [rePassword, setRePassword] = useState('')
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
        if(password.length<6) errors.push('Password must be atleast 6 characters long')
        if(password!==rePassword) errors.push('Re-password is wrong')
        
        if(errors.length===0){
            dispatch(register(name, email, password, rePassword))
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
                        value={name} 
                        type={'text'} 
                        setState={setName}
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
                    <PasswordStrengthMeter 
                        password={password} 
                        passwordFocus={passwordFocus}
                    />
                    <FormFieldRePassword
                        label={'Re-Enter Password'}
                        equals={password===rePassword}
                        showPassword={showPassword}
                        setState={setRePassword}
                        value={rePassword}
                    />
                    <FormFieldButton text={'Register'}/>

                    <li className='toRegister'>
                        Already have an account?
                    </li>
                    <li>
                        <Link to={redirect === '/' ? 'signin': 'signin?redirect='+redirect} className='button secondary' >Sign-in</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}