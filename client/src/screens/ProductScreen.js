import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct, saveProduct, saveProductReview } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {

    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const productId = props.match.params.id
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(detailsProduct(productId))
    },[])
    
    const handleAddToCart = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    console.log(loading, error, product)
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
                    <li>
                        <a href='#reviews'>
                            <Rating
                                value={product.rating}
                                text={product.numReviews+' reviews'} 
                            />
                        </a>
                    </li>
                </ul>
            </div>
            <div className='detailsImage'>
                <img className='detailsImage' src={product.image} alt='product'/>
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
                <button onClick={handleAddToCart} className='button fullWidth primary'>Add to cart</button>}
            </div>  
            <Reviews product={product}/>
        </div>
    )
}

function Reviews({product}){
    
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const userInfo = userSignin.userInfo

    const productReviewSave = useSelector(state => state.productReviewSave)
    const {success:productSaveSuccess} = productReviewSave

    useEffect(()=>{
        if(productSaveSuccess){
            alert('Review submitted succesfully')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_REVIEW_SAVE_RESET})
            dispatch(detailsProduct(product._id))
        }
    },[productSaveSuccess])

    const dispatch = useDispatch()
    console.log(product._id)
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveProductReview(product._id, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }))
    }
    console.log(product)
    return(
        <div className='reviewContainer'>
            <ul className='review' id='reviews'>
                <h2>Reviews</h2>
                {!product.reviews.length && <div>There are no reviews</div>}
                {product.reviews.map(review =>
                    <li key={review._id}>
                        <div>{review.name}</div>
                        <div><Rating value={review.rating}/></div>
                        <div>{review.createdAt.substring(0, 10)}</div>
                        <div>{review.comment}</div>
                    </li>
                )}            
                <li className='reviewAction'>
                    <h3>Write a customer review</h3>
                    {userInfo ? <form onSubmit={submitHandler}>
                        <ul 
                            className='formContainer'
                            
                            >
                            <li>
                                <label htmlFor='rating'>
                                    Rating
                                </label>
                                <select name='rating' id='rating' value={rating} onChange={e => setRating(e.target.value)}>
                                    <option value='1'>1- Poor</option>
                                    <option value='2'>2- Fair</option>
                                    <option value='3'>3- Good</option>
                                    <option value='4'>4- Very Good</option>
                                    <option value='5'>5- Excellent</option>
                                </select>
                            </li>
                            <li>
                                <label htmlFor='comment'>Comment</label>
                                <textarea name='comment' value={comment} onChange={e => setComment(e.target.value)}/>
                            </li>
                            <li>
                                <button type='submit' className='button primary'>Submit</button>
                            </li>
                        </ul>
                    </form>:
                    <div>Please <Link to='/signin'>Signin</Link> to write a review</div>}
                </li>
            </ul>  
        </div>
    )
}