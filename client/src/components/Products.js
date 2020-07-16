import React from 'react'
import data from '../data'

export default function Products() {
    return (
        <div className="products">
          {data.products.map(product => 
            <Product key={product._id} data={product}/>
          )}
        </div>   
    )
}

function Product({data}){
  return (
    <li>
      <div className='product'>
        <img className='productImage' src={data.image}/>
        <div className='productName'>{data.name}</div>
        <div className='productBrand'>{data.brand}</div>
        <div className='productPrice'>{data.price}</div>            
      </div>
    </li>
  )
}