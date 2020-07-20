
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {createOrder, detailsOrder} from '../actions/orderActions'

export default function OrderScreen(props) {

    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDetails
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(detailsOrder(props.match.params.id))
    },[])

    return (
            loading?<div>Loading...</div>:error?<div>{error}</div>:
            <div className="placeorder">
                <Order order={order}/>
                <PlaceOrderAction order={order}/>
            </div>    
    )
}

function Order({order}){

    return(    
        <div className="order">
            <div className='placeorderInfo'>
                <h3>
                    Shipping
                </h3>
                <div>
                    {order.shipping.address}, {order.shipping.city},
                    {order.shipping.postalCode}, {order.shipping.country},
                </div>
                <div>
                    {order.isDelivered? "Delivered at"+ order.deliveredAt: 'Not delivered'}
                </div>

            </div>
            <div className='placeorderInfo'>
                <h3>Payment</h3>
                <div>
                    Payment Method: {order.payment.paymentMethod}
                </div>                
                <div>
                    {order.isPaid? "Paid at"+ order.paidAt: 'Not paid'}
                </div>
            </div>
            <div className='placeorderItems'>
                <ul className="cartListContainer">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                    order.orderItems.length === 0 ?
                        <div>
                        Cart is empty
                </div>
                        :
                        order.orderItems.map(item =>
                        <li className='cartItem'>
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

function PlaceOrderAction({order}){
    const itemsPrice = order.orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return (
        <div className="placeorderAction">
            <ul>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${order.itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${order.shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${order.taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${order.totalPrice}</div>
                </li>

            </ul>                
            <button className='button primary fullWidth'>
                Pay Now
            </button>
        </div>
    )
}