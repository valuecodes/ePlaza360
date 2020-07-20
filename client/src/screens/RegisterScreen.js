import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions';
import { userInfo } from 'os';

export default function RegisterScreen(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error } = userRegister

    const dispatch = useDispatch()
    const redirect = props.location.search?props.location.search.split('=')[1]:'/'

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
    },[userInfo])
    
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    return (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <li>
                        <h3>Create Account</h3>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}                        
                    </li>
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' id='name' onChange={e => setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' onChange={e => setEmail(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' onChange={e => setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor='rePassword'>Re-Enter Password</label>
                        <input type='password' name='rePassword' id='rePassword' onChange={e => setRePassword(e.target.value)}/>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>Register</button>
                    </li>
                    <li className='toRegister'>Already have an account?</li>
                    <li>
                    <Link to={redirect === '/' ? 'signin': 'signin?redirect='+redirect} className='button secondary' >Create Account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}