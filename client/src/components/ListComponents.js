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
            <span>{text}</span>
            <b>{value}</b> 
        </li>
    )
}
export function ListItemColor({text, value}) {
    return (
        <li className='listItem'>
            <span>Color</span>
            <div className='listItemColor'
            style={{
                backgroundColor: value,
                opacity: 1,
                border: '0.1rem solid dimgray',
            }} 
            ></div>
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

export function ListSelectColors({text, colors, color, setColor}){
    return(
        <li className='listItem listItemColors'>
            <span>{text}</span>
            <b className='listSelectedColor'>{color}</b>
            <div>
            {colors.map(col =>
                <button 
                    className='listItemColor'
                    key={col}
                    style={{
                        backgroundColor: col,
                        opacity: color===col?1:0.6,
                        border: color===col?'0.1rem solid dimgray':'',
                        transform: color===col?'scale(1.05)':'scale(1)'
                    }}  
                    onClick={e => setColor(col)}
                ></button>
            )}                
            </div>
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
            <span>{text}</span>
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

export function ListSelectArray(props){
    
    const {
        text,
        setState,
        value,
        array
    } = props

    return(
        <li className='listItem'>
            <span>{text}</span>
            <select className='select' onChange={e => setState(e.target.value)} value={value}>
                {array.map((value) =>
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