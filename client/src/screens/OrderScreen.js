
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, payOrder} from '../actions/orderActions'
import { ListHeader, ListItemFullWidth, ListItemLast, ListItemPaypal } from '../components/ListComponents'
import { CartList, OrderInfo } from '../components/CartComponents'

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
            <OrderInfo 
                cart={order} 
                showStatus={true}
            />
            <CartList
                header={'Order'} 
                cartItems={order.orderItems} 
                orderActions={true}
                reviewActions={true}
            />
        </div>
    )
}

function PlaceOrderAction({order}){

    const dispatch=useDispatch()

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    return (
        <div className='actions placeorderAction'>
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