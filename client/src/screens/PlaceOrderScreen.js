
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createOrder} from '../actions/orderActions'
import { ListHeader, ListButton, ListItemLast, ListItemFullWidth } from '../components/ListComponents'
import { CartList, OrderInfo } from '../components/CartComponents' 

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
            <OrderInfo cart={cart}/>
            <CartList 
                cartItems={cartItems} 
                orderActions={true}
            />
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
        <div className='actions'>
            <div className='actionContainer'>
                <ul className='actionList'>                    
                    <ListButton 
                        text={'Place Order'} 
                        onClick={placeOrderHandler} 
                    />
                    <ListHeader 
                        text={'Order Summary'} 
                        border={false}
                    />
                    <ListItemFullWidth 
                        text={'Items'} 
                        value={`$${itemsPrice}`}
                    />
                    <ListItemFullWidth 
                        text={'Shipping'} 
                        value={`$${shippingPrice}`}
                    />
                    <ListItemFullWidth 
                        text={'Tax'} 
                        value={`$${taxPrice}`}
                    />
                    <ListItemLast 
                        text={'Order Total'} 
                        value={`$${totalPrice}`}
                    />
                </ul>
            </div>
        </div>
    )
}