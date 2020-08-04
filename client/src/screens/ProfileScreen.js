import React,{useState, useEffect} from 'react'
import { logout, update } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
    FormField, 
    FormFieldButton, 
    FormFieldHeader, 
    FormFieldMessages, 
    FormFieldChangePassword,
    checkFormErrors
} from '../components/FormComponents'
import {
    TableTitle,
    TableHeader,
    TableItem,
    TableItemDate, 
    TableItemPrice, 
    TableItemBoolean, 
    TrackPackage
} from '../components/TableComponents'

export default function ProfileScreen(props) {
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch(logout())
        props.history.push('/signin')
    }

    return (
        <div className='profile'> 
            <ProfileInfo handleLogout={handleLogout}/>
            <ProfileOrders/>
        </div>
    )
}

function ProfileInfo({handleLogout}){
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, success, error} = userUpdate

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [currentPassword, setCurrentPassword]=useState('')
    const [formErrors, setFormErrors] = useState([])

    const [newPassword, setNewPassword] = useState('')
    const [newRePassword, setNewRePassword] = useState('')

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPassword(userInfo.password)
        }
        dispatch(listMyOrders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitHandler = (e) =>{
        e.preventDefault()
        let errors=checkFormErrors(newPassword, newRePassword)
        if(errors.length===0){    
            dispatch(update({
                userId: userInfo._id, 
                email, 
                name, 
                currentPassword,
                newPassword
            }))
        }else{
            setFormErrors(errors)
        }
    }

    return(
        <div className='profileInfo contentCenter'>
            <form className='form' onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <FormFieldHeader text={'User Profile'}/>
                    <FormFieldMessages 
                        loading={loading}
                        error={error}
                        success={success}
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
                    <FormFieldChangePassword
                        password={password}
                        currentPassword={currentPassword}
                        setCurrentPassword={setCurrentPassword}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        newRePassword={newRePassword}
                        setNewRePassword={setNewRePassword}
                    />
                    <FormFieldButton text={'Update'}/>
                    <li>
                        <button 
                            type='button' 
                            onClick={handleLogout} 
                            className='button secondary fullWidth'>
                            Logout
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

function ProfileOrders(){

    const myOrderList = useSelector(state => state.myOrderList)
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList

    return(
        <div className='profileOrders'>
            <TableTitle text={'My Orders'}/>
            <table className='table'>
                <thead>
                    <tr>
                        <TableHeader text={'ID'}/>
                        <TableHeader text={'DATE'}/>
                        <TableHeader text={'TOTAL'}/>
                        <TableHeader text={'PAID'}/>
                        <TableHeader text={'STATUS'}/>
                        <TableHeader text={'DETAILS'}/>
                    </tr>
                </thead>
                <tbody>
                    {loadingOrders? <div>Loading...</div>:
                    errorOrders? <div>{errorOrders}</div>:
                    <>
                        {orders.map(order =>
                            <Order key={order._id} order={order}/>
                        )}
                    </>}
                </tbody>
            </table>
        </div>
    )
}

function Order({order}){
    return(
        <tr>
            <TableItem text={order._id}/>
            <TableItemDate date={order.createdAt} />
            <TableItemPrice price={order.totalPrice}/>
            <TableItemBoolean condition={order.isPaid}/>
            <TrackPackage order={order} actions={false}/>
            <td className='tableButtons'>
                <button className='button secondary'>
                    <Link to={'/order/'+order._id}>Details</Link>
                </button>      
            </td>
        </tr>
    )
}  

