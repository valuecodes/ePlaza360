import React,{useState, useEffect} from 'react'
import { logout, update } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ProfileScreen(props) {
    return (
        <div className='profile'> 
            <ProfileInfo/>
            <ProfileOrders/>
        </div>
    )
}

function ProfileInfo(props){
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, success, error} = userUpdate

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPassword(userInfo.password)
        }
        dispatch(listMyOrders())
    }, [])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(update({userId: userInfo._id, email, name, password}))
    }

    const handleLogout = () =>{
        dispatch(logout())
        props.history.push('/signin')
    }

    return(
        <div className='profileInfo'>
            <div className='form'>
                <form onSubmit={submitHandler}>
                    <ul className='formContainer'>
                        <li>
                            <h3>User Profile</h3>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile Saved Succesfully</div>}
                        </li>
                        <li>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' id='name' value={name} onChange={e => setName(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        </li>
                        <li>
                            <button type='submit' className='button primary fullWidth'>Update</button> 
                        </li>
                        <li>
                            <button type='button' onClick={handleLogout} className='button secondary fullWidth'>Logout</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

function ProfileOrders(){

    const myOrderList = useSelector(state => state.myOrderList)
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList

    return(
        <div className='profileOrders'>
        {
            loadingOrders? <div>Loading...</div>:errorOrders?<div>{errorOrders}</div>:
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>
                        <Order order={order}/>
                    )}
                </tbody>
            </table>
        }
        </div>
    )
}

function Order({order}){
    return(
        <tr>
            <td>{order._id}</td>
            <td>{order.createdAt}</td>
            <td>{order.totalPrice}</td>
            <td>{order.isPaid?'Paid':'Not Paid'}</td>
            <td>
                <Link to={'/order/'+order._id}>DETAILS</Link>
            </td>
        </tr>
    )
}  

