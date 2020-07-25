import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveShipping } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { FormFieldHeader, FormField, FormFieldButton } from '../components/FormComponents'

export default function ShippingScreen(props) {

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch()
    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShipping({address, city, postalCode, country}))
        props.history.push('payment')
    }

    return (
        <div className='contentCenter'>  
            <form className='form' onSubmit={submitHandler}>
                <CheckoutSteps step1 step2/>
                <ul className='formContainer'>
                    <FormFieldHeader 
                        text={'Shipping'}
                    />
                    <FormField 
                        name={'address'} 
                        value={address} 
                        type={'text'} 
                        setState={setAddress}
                    />
                    <FormField 
                        name={'city'} 
                        value={city} 
                        type={'text'} 
                        setState={setCity}
                    />
                    <FormField 
                        name={'Postal Code'} 
                        value={postalCode} 
                        type={'text'} 
                        setState={setPostalCode}
                    />
                    <FormField 
                        name={'Country'} 
                        value={country} 
                        type={'text'} 
                        setState={setCountry}
                    />
                    <FormFieldButton
                        text='Continue'
                    />
                </ul>
            </form>             
        </div>
    )
}