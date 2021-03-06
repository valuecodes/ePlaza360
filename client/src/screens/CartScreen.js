import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions';
import { ListHeader, ListButton, ListItemFullWidth } from '../components/ListComponents'
import { CartList } from '../components/CartComponents'

export default function CartScreen(props) {
    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;
    
    const productId = props.match.params.id;
    
    const qty = props.location.search ? Number(props.location.search.split("qty=")[1].split('?')[0]) : 1;
    const color = props.location.search ? props.location.search.split("color=")[1].split('?size')[0] : '';
    const size = props.location.search ? Number(props.location.search.split("size=")[1]) : '';
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
          dispatch(addToCart( productId, qty, color, size ));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const checkoutHandler = () => {
      props.history.push("/signin?redirect=shipping");
    }
    return (
        <div className='cart'>
            <CartList 
                cartItems={cartItems} 
                cartActions={true}
            />
            <CartAction 
                cartItems={cartItems}
                checkoutHandler={checkoutHandler}
            />
        </div>
    )
}

function CartAction({cartItems, checkoutHandler}){
    return(
        <div className='actions'>
            <div className='actionContainer'>
                <ul className='actionList'>
                    <ListHeader 
                        text='Checkout'
                        border={false}
                    />
                    <ListItemFullWidth 
                        text={'Items: '} 
                        value={`${cartItems.reduce((a, c) => a + Number(c.qty),0)} pcs` } 
                    />
                    <ListItemFullWidth
                        text={'Subtotal: '}
                        value={`$ ${cartItems.reduce((a, c) => a + (c.price*c.qty),0)}`}
                    />
                    <ListButton 
                        text={'Proceed to checkout'} 
                        onClick={checkoutHandler} 
                        buttonDisabled={cartItems.length===0} 
                    />
                </ul>  
            </div>
        </div>      
    )

}