import React from 'react'
import data from '../data'
import { Link } from 'react-router-dom'

export default function Products() {
    return (
      <>
          {data.products.map(product => 
            <Product key={product._id} data={product}/>
          )}
      </> 
    )
}

function Product({data}){
  return (
    <li>
      <div className='product'>
        <Link to={`/product/${data._id}`}>
          <img className='productImage' src={data.image} alt='product'/>
        </Link>
        <div className='productName'>
          <Link to={`/product/${data._id}`}>{data.name}</Link>
        </div>
        <div className='productBrand'>{data.brand}</div>
        <div className='productPrice'>{data.price}</div>            
      </div>
    </li>
  )
}