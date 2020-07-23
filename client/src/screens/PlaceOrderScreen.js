
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {createOrder} from '../actions/orderActions'

export default function PlaceOrderScreen(props) {

    const createOrder =  useSelector(state => state.orderCreate)
    const {loading, success, error, order} = createOrder

    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[success])

    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    if (Object.values(payment).length!==1) {
        props.history.push("/payment");
    }

    if (Object.values(shipping).length!==4) {
        props.history.push("/shipping");
    }

    return (loading? <div>Loading...</div>:error?<div>error</div>:
            <div className="placeorder">
                <Order
                    cart={cart}
                    cartItems={cartItems}
                />
                <PlaceOrderAction
                    cart={cart}
                    cartItems={cartItems}
                    shipping={shipping}
                    payment={payment}
                />
            </div>    
    )
}

function Order({cart, cartItems}){

    return(    
        <div className="order">
            <div className='placeorderInfo'>
                <h3>
                    Shipping
                </h3>
                <div>
                    {cart.shipping.address}, {cart.shipping.city},
                    {cart.shipping.postalCode}, {cart.shipping.country},
                </div>
            </div>
            <div className='placeorderInfo'>
                <h3>Payment</h3>
                <div>
                    Payment Method: {cart.payment.paymentMethod}
                </div>
            </div>
            <div className='placeorderItems'>
                <ul className="cartListContainer">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                    cartItems.length === 0 ?
                        <div>
                        Cart is empty
                </div>
                        :
                        cartItems.map(item =>
                        <li key={item.product} className='cartItem'>
                            <img className="cartItemImage" src={item.image} alt="product" />
                            <div className='cartItemInfo'>
                                <div className="cartName">
                                <div>
                                    <Link to={"/product/" + item.product}>
                                    {item.name}
                                    </Link>

                                </div>
                                <div>
                                    Qty: {item.qty}
                                </div>
                                </div>
                            </div>
                            <div className="cartItemPrice">
                            ${item.price}
                            </div>
                        </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

function PlaceOrderAction({cart, cartItems, shipping, payment}){

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler=()=>{
        dispatch(createOrder({
            orderItems: cartItems, 
            shipping, 
            payment, 
            itemsPrice, 
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

    return (
        <div className="placeorderAction">
            <ul>
                <li>
                    <button className="button primary fullWidth" onClick={placeOrderHandler} >Place Order</button>
                </li>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice}</div>
                </li>
            </ul>
        </div>
    )
}