import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { ProductInfo } from '../components/ProductComponents'
import { Link } from 'react-router-dom'

export default function HomeScreen(props) {
    
    let brand=''
    let priceFrom=''
    let priceTo=''

    if(props.match.params.query){
        brand = props.match.params.query.split('&brand=')[1]? props.match.params.query.split('&brand=')[1].split('&')[0]:''
        priceFrom = props.match.params.query.split('&price_from=')[1]? props.match.params.query.split('&price_from=')[1].split('&')[0]:'' 
        priceTo = props.match.params.query.split('&price_to=')[1]? props.match.params.query.split('&price_to=')[1].split('&')[0]:'' 
    }

    const category = props.match.params.id?props.match.params.id:''
    
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts({category,brand,priceFrom,priceTo}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category,brand,priceFrom,priceTo])

    return (
        <div className='homeScreen container'>
            <Filter category={category} brand={brand} priceFrom={priceFrom} priceTo={priceTo}/>
            <h2 className='category'>{category.replace('_','-')}</h2>
            {loading? 
                <div className='loading'>Loading...</div>:
                error?<div>{error.message}</div>:
                <Products products={products} category={category}/>
            }
        </div>
    )
}

function Filter({category, brand, priceFrom ,priceTo}){

    const [searchKeyword, setSearchKeyWord] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(listProducts({category, brand, priceFrom ,priceTo, searchKeyword, sortOrder}))
    }

    const sortHandler = (order) =>{
        setSortOrder(order)
        dispatch(listProducts({category, brand, priceFrom ,priceTo, searchKeyword,sortOrder: order}))
    }

    const resetFilter = () =>{
        setSearchKeyWord('')
        setSortOrder('')
        dispatch(listProducts({}))
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

function Products({products, category}){
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