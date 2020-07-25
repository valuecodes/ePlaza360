import React from 'react'
import PaypalButton from '../components/PaypalButton'

export function ListHeader({text,border=true}){
    return(
        <h2 className='listHeader'
            style={{border:border?'visible':'hidden'}}
        >
            {text}
        </h2>
    )
}

export function ListItem({text, value}) {
    return (
        <li className='listItem'>
            <p>{text}</p>
            <b>{value}</b> 
        </li>
    )
}

export function ListItemLast({text, value}) {
    return (
        <li className='listItemLast'>
            <p>{text}</p>
            <b>{value}</b> 
        </li>
    )
}

export function ListItemFullWidth({text, value}) {
    return (
        <li className='listItemFullWidth'>
            <h4>{text}</h4>
            <b>{value}</b> 
        </li>
    )
}

export function ListItemPaypal({order, handleSuccessPayment}) {
    return (
    <li className='listItemPaypal'>
        {!order.isPaid && 
            <PaypalButton 
                amount={order.totalPrice} 
                onSuccess={handleSuccessPayment}
            />
        }
    </li>
    )
}

export function ListSelect(props){
    
    const {
        text,
        setState,
        value,
        optionNumbers
    } = props
    
    return(
        <li className='listItem'>
            <p>{text}</p>
            <select className='select' onChange={e => setState(e.target.value)} value={value}>
                {[...Array(optionNumbers).keys()].map((value) =>
                    <option 
                        className='option' 
                        key={value+1} 
                        value={value+1}
                    >
                        {value+1}
                    </option>
                )}
            </select>
        </li>           
    )
}

export function ListButton({text, onClick, buttonDisabled=false}){
    return(
        <button  onClick={onClick} className='button fullWidth primary listButton' disabled={buttonDisabled}>
        {text}
        </button> 
    )
}