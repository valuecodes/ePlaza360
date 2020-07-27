import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct, saveProductReview } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { ListItem, ListSelect, ListButton, ListHeader } from '../components/ListComponents'
import { TotalRating, CustomerReviews, Rating, WriteReview } from '../components/RatingComponents'

export default function ProductScreen(props) {

    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const productId = props.match.params.id
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(detailsProduct(productId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const handleAddToCart = () =>{
        console.log('adding to cart')
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
                        <Rating
                            rating={product.rating}
                            text={product.numReviews+' reviews'} 
                        />
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
            <div className='actionContainer'>
                <ul className='actionList'>
                    <ListHeader 
                        text={'Cart'}
                        border={false}
                    />
                    <ListItem 
                        text={'Price:'} 
                        value={'$'+product.price}
                    />
                    <ListItem 
                        text={'Status:'} 
                        value={product.countInStock>0?'In stock':'Unavailable'}
                    />
                    <ListSelect 
                        text={'Qty: '} 
                        setState={setQty} 
                        value={qty} 
                        optionNumbers={product.countInStock}
                    />
                    {product.countInStock && 
                        <ListButton 
                            text='Add to Cart' 
                            onClick={handleAddToCart}
                        />
                    }                    
                </ul>
            </div>  
            <Ratings product={product}/>
        </div>
    )
}

function Ratings({product}){
    
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productSaveSuccess])

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveProductReview(product._id, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }))
    }

    return(
        <div className='actions'>
            <div className='actionContainer'>
                <ul className='actionList'>
                    <TotalRating product={product}/>
                    <CustomerReviews product={product}/>
                    {!product.reviews.length && <div>There are no reviews</div>}      
                    {userInfo ? 
                        <WriteReview 
                            submitHandler={submitHandler}
                            rating={rating}
                            setRating={setRating}
                            comment={comment}
                            setComment={setComment}
                        />
                    :
                    <div>Please <Link to='/signin'>Signin</Link> to write a review</div>}    
                </ul>
            </div>
        </div>
    )
}