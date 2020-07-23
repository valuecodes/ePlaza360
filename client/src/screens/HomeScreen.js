import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

export default function HomeScreen(props) {

    const category = props.match.params.id?props.match.params.id:''
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading? <div>Loading...</div>:error?<div>
    
    {error.message}</div>:
        <div>
            {category && <h2>{category}</h2>}
            <Filter category={category}/>
            <Products products={products}/>
        </div>
}

function Filter({category}){

    const [searchKeyword, setSearchKeyWord] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }

    const sortHandler = (order) =>{
        setSortOrder(order)
        dispatch(listProducts(category, searchKeyword, order))
    }

    const resetFilter = () =>{
        setSearchKeyWord('')
        setSortOrder('')
        dispatch(listProducts())
    }

    return(
        <ul className='filter'>
            <li>
                <form className='filterForm' onSubmit={submitHandler}>
                    <input className='filterInput' name='searchKeyWord' onChange={e => setSearchKeyWord(e.target.value)}/>
                    <button className='filterButton first' type='submit '>Search</button>
                </form>
            </li>
            <li>
                <select className='sortOrder roundButton' name='sortOrder' value={sortOrder} onChange={e => sortHandler(e.target.value)}>
                    <option value=''>Newest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
                <button type='button' className='second' onClick={resetFilter}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>                
            </li>
        </ul>
    )
}

function Products({products}){
  return (
    <div className="products">
        {products.map(product => 
            <li key={product._id}>
                <div className='product'>
                    <Link className='imageLink' to={`/product/${product._id}`}>
                        <img className='productImage' src={product.image} alt='product'/>
                    </Link>
                    <div className='productName'>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </div>
                    <div className='productBrand'>{product.brand}</div>
                    <div className='productPrice'>${product.price}</div>    
                    <div className='productRating'>
                        <Rating 
                            value={product.rating}
                            text={product.numReviews+' reviews'} 
                        />
                    </div>        
            </div>
            </li>        
        )}
    </div>
  )
}