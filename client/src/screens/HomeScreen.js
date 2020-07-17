import React, {useEffect} from 'react'
import Products from '../components/Products'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'

export default function HomeScreen() {
    
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return loading? <div>Loading...</div>:error?<div>{error.message}</div>:
        <div>
            <div className="products">
              <Products products={products}/> 
            </div>
        </div>
    
}
