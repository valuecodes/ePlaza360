import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'

export function CartList({header ,cartItems, actions=true}){
    return(
        <div className='cartList'>
            <ul className='cartListContainer'>
                <CartHeader header={header}/>
                {
                    cartItems.length === 0 ?
                    <div>Cart is empty</div>:
                    cartItems.map(item =>
                        <CartItem key={item.product} item={item} actions={actions}/>
                    )
                }
            </ul>
        </div>        
    )
}

function CartItem({item, actions}){

    const dispatch = useDispatch()

    const removeFromCartHandler=(productId)=>{
        dispatch(removeFromCart(productId))
    }

    return(
        <div key={item.product} className='cartItem'> 
            <img className='cartItemImage' src={item.image} alt='product'/>
            <div className='cartItemInfo'>
                <div className='cartItemName'>
                    <Link to={`/product/${item.product}`}>
                        {item.name}
                    </Link>
                </div>
                <div className='cartItemDescription'>{item.description}</div>
                {actions &&
                    <>
                        <div className='cartQty'>
                            Qty: {' '}
                            <select className='select' onChange={e => dispatch(addToCart(item.product, e.target.value))} value={item.qty}>
                                {[...Array(item.countInStock).keys()].map((value) =>
                                    <option key={value+1} value={value+1}>{value+1}</option>
                                )}
                            </select>
                        </div>
                        <button className='button secondary cartRemove' type='button' onClick={e => removeFromCartHandler(item.product)}>Remove</button>   
                    </>             
                }
                {!actions &&
                    <p>Qty: <b>{item.qty}</b></p>
                }
            </div>                                
            <div className='cartItemPrice'>${item.price}</div>
        </div>  
    )
}


export function CartHeader({header='Shopping cart'}) {
    return (
        <li className='cartHeader'>
            <h3>{header}</h3>
            <div>Price</div>
        </li>
    )
}

