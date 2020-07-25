import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { savePayment } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { FormFieldRadioButton, FormFieldHeader, FormFieldButton } from '../components/FormComponents'

export default function PaymentScreen (props){

    const [paymentMethod, setPaymentMethod] = useState('')

    const dispatch = useDispatch()  

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePayment({paymentMethod}))
        props.history.push('placeorder')
    }

    return (
        <div className='contentCenter'>
            <div className='form'>
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <form onSubmit={submitHandler}>
                    <ul className='formContainer'>
                        <FormFieldHeader 
                            text='Payment Method'
                        />
                        <FormFieldRadioButton 
                            name={'paymentMethod'}
                            label={'Paypal'} 
                            value={'paypal'} 
                            type={'radio'} 
                            setState={setPaymentMethod}
                        />
                        <FormFieldButton 
                            text='Continue'
                        />
                    </ul>
                </form>
            </div> 
        </div>
    )     
}