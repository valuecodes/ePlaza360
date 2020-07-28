import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import { WriteReviewSlim } from '../components/RatingComponents'

export function CartList(props){
    
    const {
        header,
        cartItems,
        cartActions = false,
        orderActions = false,
        reviewActions = false 
    } = props

    return(
        <div className='cartList'>
            <ul className='cartListContainer'>
                <CartHeader header={header}/>
                {
                    cartItems.length === 0 ?
                    <div>Cart is empty</div>:
                    cartItems.map(item =>
                        <CartItem 
                        key={item.product} 
                        item={item} 
                        cartActions={cartActions}
                        orderActions={orderActions}
                        reviewActions={reviewActions}
                    />
                    )
                }
            </ul>
        </div>
    )
}

function CartItem(props){

    const {
        item,
        cartActions,
        orderActions,
        reviewActions
    } = props

    const dispatch = useDispatch()

    const removeFromCartHandler=(productId)=>{
        dispatch(removeFromCart(productId))
    }
    console.log(props)
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
                {cartActions &&
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
                {orderActions &&
                    <p>Qty: <b>{item.qty}</b></p>
                }
            </div>  
            {reviewActions &&
                <WriteReviewSlim product={item.product} />
            }                              
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

export function OrderInfo({cart, showStatus=false}){
    return(
        <div className='orderInfoContainer'>
            <ShippingInfo cart={cart} showStatus={showStatus}/>
            <PaymentInfo cart={cart} showStatus={showStatus}/>
            {cart.orderItems&&
            <>
                <TrackingInfo cart={cart} showStatus={showStatus}/>
                <ReviewInfo cart={cart} showStatus={showStatus}/>
            </>
            }
        </div>
    )
}

function ShippingInfo({cart, showStatus}){
    return(
        <div className='orderInfo'>
            <div className='infoContainerHeader'>
                <h3>Shipping</h3>
                {showStatus &&
                    <span>Status <b>{cart.isDelivered? "Delivered at"+ cart.deliveredAt: 'Not delivered'}</b></span>
                }
            </div>
            <div className='infoContainer'>
                <div>
                    <i className="fa fa-address-card fa-5x cardBig " aria-hidden="false"></i>
                </div>
                <div className='infoText'>
                    <span><b>Address</b></span>
                    <span>{cart.shipping.address} </span>
                    <span>{cart.shipping.city}</span>
                    <span>{cart.shipping.postalCode}</span>
                    <span>{cart.shipping.country}</span>
                </div>
            </div>
        </div>        
    )
}

function PaymentInfo({cart, showStatus}){
    return(
        <div className='orderInfo'>
            <div className='infoContainerHeader'>
                <h3>Payment</h3>                        
                {showStatus&&
                    <span>Status <b>{cart.isPaid? ' Paid': 'Not paid'}</b></span>     
                }
            </div>                
            <div className='infoContainer'>
                <div>
                    <i className="fa fa-credit-card fa-5x cardBig " aria-hidden="false"></i>
                </div>
                <div className='infoText'>
                    <span><b>Payment Method</b></span>
                    <span>{cart.payment.paymentMethod}</span> 
                    <span></span>
                    {showStatus&&cart.isPaid&&
                        <>
                            <span><b>Paid at:</b></span>
                            <span>{cart.paidAt.split('T')[0].split('-').join(' ')}</span>
                            <span>{cart.paidAt.split('T')[1].substring(0,8)}</span>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

function ReviewInfo({cart, showStatus}){
    return(
        <div className='orderInfo'>
            <div className='infoContainerHeader'>
                <h3>Review</h3>                        
                {showStatus&&
                    <span>Status <b style={{color:'var(--main-red-color)'}}>{false? ' Reviewed': ' No reviews'}</b></span>     
                }
            </div>                
            <div className='infoContainer'>
                <div>
                    <i className="fa fa-tags fa-5x cardBig " aria-hidden="false"></i>
                </div>
                <div className='infoText'>
                    <span><b>Items reviewed</b></span>
                    {cart.orderItems.map(item => 
                        <span className='reviewedItems' key={item._id}>{item.name}</span> 
                    )}
                </div>
            </div>
        </div>
    )
}

function TrackingInfo({cart, showStatus}){
    return(
        <div className='orderInfo'>
            <div className='infoContainerHeader'>
                <h3>Track Package</h3>                        
                {showStatus&&
                    <span>Status <b>Order received</b></span>     
                }
            </div>                
            <div className='infoContainerTracking'>
                <TrackingIcon icon={'fa fa-file-o'}/>
                <AngleRight/>
                <TrackingIcon icon={'fa fa-plane'}/>
                <AngleRight/>
                <TrackingIcon icon={'fa fa-plane landing'}/>
                <AngleRight/>
                <TrackingIcon icon={'fa fa-calendar-check-o'}/>
            </div>
        </div>
    )
}

export function TrackingIcon({icon}) {
    return (
        <div className='trackingIconContainer'>
            <i className={`${icon} trackingIcon`} aria-hidden="true">
            </i>            
        </div>
    )
}

export function AngleRight() {
    return (
        <div >
            <i className="fa fa-angle-right trackingIcon" aria-hidden="true">
            </i>
        </div>
    )
}
