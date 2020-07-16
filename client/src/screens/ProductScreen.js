import React from 'react'
import data from '../data'
import { Link } from 'react-router-dom'

export default function ProductScreen(props) {
    data.products.forEach(element => {
        console.log(element._id===props.match.params.id)
    });
    const product = data.products.find(product => Number(product._id) ===Number(props.match.params.id))

    return (
        <div className='productScreen'>
            <Details product={product}/>
            <Actions product={product}/>
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

function Actions({product}){
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
                        <b>{product.countInStock>0?'In stock':'Out of stock'}</b>
                    </li>
                    <li>
                        <p>Qty: </p>
                        <select>
                            {[...Array(product.countInStock).keys()].map((value) =>
                                <option key={value+1} value={value+1}>{value+1}</option>
                            )}
                        </select>
                    </li>                         
                </ul>
                <button className='button'>Add to cart</button>  
            </div>  
        </div>
    )
}