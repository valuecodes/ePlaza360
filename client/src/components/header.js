import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
 
export default function Header() {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    return (
        <header className='header'>
            <div className='brand'>
                <Link to='/'>ePlaza360</Link>
            </div>
            <div className='navbar'>
                {
                    userInfo?<Link to='/profile'>{userInfo.name}</Link>:
                    <Link to='/signin'>Signin</Link>
                }
                <a href='sigin'>Cart</a>
                {
                    userInfo?
                    userInfo.isAdmin&&
                    <Link to='products'>Admin</Link>:''}
            </div>
        </header>
    )
}
