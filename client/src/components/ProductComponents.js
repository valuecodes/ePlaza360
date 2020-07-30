import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '../components/RatingComponents'

export function ProductInfo({product, link=false, ratingBar=true}) {
    return (
        <div className='productInfoContainer'>
            <div className='productName'>
            {link?
                <Link to={`/product/${product._id}`}>{product.name}</Link>:
                <div className='productName'>{product.name}</div>
            }
            </div>
            <div className='productBrand'>
                <span>
                    {product.brand}
                </span>
            </div>
               
            <div className='productInfo'>
                <div className='productPrice'>${product.price}</div>
                {ratingBar&&
                    <Rating 
                        rating={product.rating}
                        text={product.numReviews+' reviews'} 
                    />                
                }                 
            </div>                 
        </div>
    )
}
