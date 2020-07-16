import React, {useState, useEffect} from 'react'
import Products from '../components/Products'
import axios from 'axios'

export default function HomeScreen() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchData(){
            console.log('get data')
            const {data} = await axios.get('/api/products')
            console.log(data)
            setProducts(data.products)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="products">
              <Products products={products}/> 
            </div>
        </div>
    )
}
