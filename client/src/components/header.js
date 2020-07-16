import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='header'>
            <div className='brand'>
                <Link to='/'>ePlaza360</Link>
            </div>
            <div className='navbar'>
                <a href='sigin'>Signin</a>
                <a href='sigin'>Cart</a>
            </div>
        </header>
    )
}
