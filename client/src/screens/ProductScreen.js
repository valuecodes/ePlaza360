import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct } from '../actions/productActions'

export default function ProductScreen(props) {

    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const dispatch = useDispatch()
    
    useEffect(()=>{
        const productId = props.match.params.id
        dispatch(detailsProduct(productId))
    },[])
    
    const handleAddToCart = () =>{
        const productId = props.match.params.id
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        loading?<div>Loading...</div>:error?<div>{error}</div>:
        <div className='productScreen'>
            <Details product={product}/>
            <Actions 
                product={product} 
                handleAddToCart={handleAddToCart}
                qty={qty}
                setQty={setQty}
            />
        </div>
    )
}

function Details({product}){
    return(
        <div className='details'>
            <div className='detailsImage'>
                <img className='detailsImage' src={product.image} alt='product'/>
            </div>
        
            <div className='detailsInfo'>
                <ul>
                    <li>
                        <div className='productName'>{product.name}</div>
                    </li>
                    <li>
                        <div className='productBrand'>{product.brand}</div>
                    </li>
                    <li>
                        <div className='productPrice detailPrice'>${product.price}</div>
                    </li>  
                </ul>
            </div>

        </div>
    )
}

function Actions({product, handleAddToCart, qty, setQty}){
    return(
        <div className='actions'>
            <div className='detailsAction'>
                <ul>
                    <li>
                        <p>Price:</p>
                        <b>${product.price}</b> 
                    </li>
                    <li>
                        <p>Status:</p>
                        <b>{product.countInStock>0?'In stock':'Unavailable'}</b>
                    </li>
                    <li>
                        <p>Qty: </p>
                        <select onChange={e => setQty(e.target.value)} value={qty}>
                            {[...Array(product.countInStock).keys()].map((value) =>
                                <option key={value+1} value={value+1}>{value+1}</option>
                            )}
                        </select>
                    </li>                         
                </ul>
                {product.countInStock && 
                <button onClick={handleAddToCart} className='button fullWidth'>Add to cart</button>}
                 
            </div>  
        </div>
    )
}