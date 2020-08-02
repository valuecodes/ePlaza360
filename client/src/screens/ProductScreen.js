import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import { ListItem, ListSelect, ListButton, ListHeader, ListSelectColors, ListSelectArray } from '../components/ListComponents'
import { TotalRating, CustomerReviews, WriteReview } from '../components/RatingComponents'
import { ProductInfo } from '../components/ProductComponents'

export default function ProductScreen(props) {

    const [qty, setQty] = useState(1)
    const [color, setColor] = useState('Gray')
    const [size, setSize] = useState(42)
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
        props.history.push(`/cart/${productId}?qty=${qty}?color=${color}?size=${size}`)
    }

    return (
        loading?<div>Loading...</div>:error?<div>{error}</div>:
        <div className='productScreen'>  
            <Details 
                product={product}
            />          
            <Actions 
                product={product} 
                handleAddToCart={handleAddToCart}
                qty={qty}
                setQty={setQty}
                color={color}
                setColor={setColor}
                size={size}
                setSize={setSize}
            />
        </div>
    )
}

function Details({product}){
    return(
        <div className='details'>
            <div className='detailsInfo'>
                <ProductInfo product={product} ratingBar={true}/>
            </div>
            <div className='detailsImage'>
                <img className='detailsImage' src={product.image} alt='product'/>
            </div>
        </div>
    )
}

function Actions(props){

    const {
        product, 
        handleAddToCart, 
        qty, 
        setQty,
        color,
        setColor,
        size,
        setSize
    } = props

    const colors=['White','Lime','Khaki','Teal','Gray','Black']
    const sizes=[38,40,41,42,43,44,45]

    return(
        <div className='actions'>
            <div className='actionContainer'>
                <ul className='actionList actionListHeader'>
                    <ListHeader 
                        text={'Cart'}
                        border={false}
                    />
                    <ListItem 
                        text={'Price:'} 
                        value={'$'+product.price}
                    />
                    <ListSelectArray
                        text={'Size'}
                        value={size}
                        array={sizes}
                        setState={setSize}
                    />   
                    <ListItem 
                        text={'Status:'} 
                        value={product.countInStock>0?'In stock':'Unavailable'}
                    />                    
                    <ListSelectColors
                        text={'Color: '} 
                        colors={colors}
                        color={color}
                        setColor={setColor}
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

    return(
        <div className='actions'>
            <div className='actionContainer'>
                <ul className='actionList'>
                    <TotalRating product={product}/>
                    <CustomerReviews product={product}/>     
                    <WriteReview product={product._id}/>
                </ul>
            </div>
        </div>
    )
}