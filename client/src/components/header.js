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
                <a href='/cart'>Cart</a>
                
                    {userInfo&&
                    userInfo.isAdmin&&
                        <div className='dropdown'>
                            <div>Admin</div>
                            <ul className='dropdownContent'>
                                <li><Link to='/orders'>Orders</Link>
                                <Link to='/products'>Products</Link></li>
                            </ul>
                        </div>
                    }
                
            </div>
        </header>
    )
}
