import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'

export default function CartScreen(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const productId = props.match.params.id
    const qty = props.location.search? Number(props.location.search.split('=')[1]):1
    const dispatch = useDispatch()

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[])

    const removeFromCartHandler=(productId)=>{
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler=()=>{
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className='cart'>
            <CartList 
                cartItems={cartItems} 
                removeFromCartHandler={removeFromCartHandler}
                dispatch={dispatch}
            />
            <CartAction 
                cartItems={cartItems}
                checkoutHandler={checkoutHandler}
            />
        </div>
    )
}

function CartList({cartItems, removeFromCartHandler, dispatch}){
    return(
        <div className='cartList'>
            <ul className='cartListContainer'>
                <li>
                    <h3>Shopping cart</h3>
                    <div>Price</div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>Cart is empty</div>:

                    cartItems.map(item =>
                        <div key={item.product} className='cartItem'> 
                            <img className='cartItemImage' src={item.image} alt='product'/>
                            <div className='cartItemInfo'>
                                <div className='cartItemName'>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </div>
                                <div>{item.description}</div>
                                <div>
                                    Qty:{' '}
                                    <select onChange={e => dispatch(addToCart(item.product, e.target.value))} value={item.qty}>
                                        {[...Array(item.countInStock).keys()].map((value) =>
                                            <option key={value+1} value={value+1}>{value+1}</option>
                                        )}
                                    </select>
                                </div>
                                <button className='button secondary' type='button' onClick={e => removeFromCartHandler(item.product)}>Remove</button>
                            </div>                                
                            <div className='cartItemPrice'>${item.price}</div>
                        </div>  
                    )
                }
            </ul>
        </div>        
    )
}

function CartAction({cartItems, checkoutHandler}){
    return(
        <div className='cartAction'>
            <h2>Checkout</h2>
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty),0)} )
                :
                $ {cartItems.reduce((a, c) => a + (c.price*c.qty),0)}
            </h3>
            <button onClick={checkoutHandler} className='button fullWidth' disabled={cartItems.length===0}>
                Proceed to checkout
            </button>
        </div>        
    )

}