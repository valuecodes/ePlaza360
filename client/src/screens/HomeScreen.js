import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { ProductInfo } from '../components/ProductComponents'
import { Link } from 'react-router-dom'

export default function HomeScreen(props) {

    const category = props.match.params.id?props.match.params.id:''
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    console.log(props.match.params)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts(category))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return loading? <div>Loading...</div>:error?<div>
    
    {error.message}</div>:
        <div className='homeScreen'>
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
        <div className='filterContainer'>    
            <ul className='filter'>
                <li>
                    <form className='filterForm' onSubmit={submitHandler}>
                        <input className='filterInput' name='searchKeyWord' onChange={e => setSearchKeyWord(e.target.value)}/>
                        <button className='filterButton first' type='submit '>Search</button>
                    </form>
                </li>
                <li className='filterActions'>
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
        </div>
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
                    <ProductInfo product={product} link={true}/>
                </div>
            </li>        
        )}
    </div>
  )
}