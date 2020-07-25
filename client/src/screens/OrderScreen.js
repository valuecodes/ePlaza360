
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder} from '../actions/orderActions'
import PaypalButton from '../components/PaypalButton'
import { ListHeader, ListItemFullWidth, ListItemLast, ListItemPaypal } from '../components/ListComponents'

export default function OrderScreen(props) {

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay, error: errorPay} = orderPay

    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDetails
    const dispatch=useDispatch()

    useEffect(()=>{
        if(successPay){
            props.history.push('/profile')
        }
        dispatch(detailsOrder(props.match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[successPay])

    return (
            loading||loadingPay?<div>Loading...</div>:error||errorPay?<div>{error}</div>:
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
                    {order.isPaid? "Paid at: "+ order.paidAt: 'Not paid'}
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

function PlaceOrderAction({order}){

    const dispatch=useDispatch()

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    return (
        <div className='actions'>
            <div className="actionContainer">
                <ul className='actionList'>
                    <ListHeader 
                        text={'Order Summary'} 
                        border={false}
                    />
                    <ListItemFullWidth 
                        text={'Items'}  
                        value={`$${order.itemsPrice}`}
                    />
                    <ListItemFullWidth 
                        text={'Shipping'}  
                        value={`$${order.shippingPrice}`}
                    />
                    <ListItemFullWidth 
                        text={'Tax'}  
                        value={`$${order.taxPrice}`}
                    />
                    <ListItemLast 
                        text={'Order Total'}  
                        value={`$${order.totalPrice}`}
                    />
                    <ListItemPaypal 
                        order={order} 
                        handleSuccessPayment={handleSuccessPayment}
                    />
                </ul>                
            </div>
        </div>
    )
}