import React, {useEffect, useState} from 'react'
import Products from '../components/Products'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'

export default function HomeScreen(props) {
    const [searchKeyword, setSearchKeyWord] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const category = props.match.params.id?props.match.params.id:''
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [])

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

    return loading? <div>Loading...</div>:error?<div>{error.message}</div>:
        <div>
            {category && 
                <h2>{category}</h2>}
            <ul className='filter'>
                <li>
                    <form onSubmit={submitHandler}>
                        <input name='searchKeyWord' onChange={e => setSearchKeyWord(e.target.value)}/>
                        <button type='submit'>Search</button>
                        <button type='button' onClick={resetFilter}>Reset</button>
                    </form>
                </li>
                <li>
                    <select name='sortOrder' value={sortOrder} onChange={e => sortHandler(e.target.value)}>
                        <option value=''>Newest</option>
                        <option value='lowest'>Lowest</option>
                        <option value='highest'>Highest</option>
                    </select>
                </li>
            </ul>
            <div className="products">
              <Products products={products}/> 
            </div>
        </div>
    
}
