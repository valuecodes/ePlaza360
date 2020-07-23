import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions';

export default function SigninScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        <div className='form'>
            <form onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <li>
                        <h3>Signin</h3>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}                        
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
                        <button type='submit' className='button primary'>Signin</button>
                    </li>
                    <li className='toRegister'>New to ePlaza360?</li>
                    <li>
                        <Link to={redirect === '/' ? 'register': 'register?redirect='+redirect} className='button secondary' >Create Account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}