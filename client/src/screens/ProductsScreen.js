import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    saveProduct, 
    listProducts, 
    deleteProduct 
} from '../actions/productActions';
import { 
    FormField, 
    FormFieldText, 
    FormFieldHeader 
} from '../components/FormComponents'
import {
    TableHeader,
    TableItem,
    TableItemPrice
} from '../components/TableComponents'

export default function ProductsScreen(props) {

    const [modalVisible, setmodalVisible] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [rating, setRating] = useState('')
    const [numReviews, setNumReviews] = useState('')

    const productList = useSelector(state => state.productList)
    const {loading, products, error } = productList

    const productSave = useSelector(state => state.productSave)
    const {loading: loadingSave, success: successSave, error: errorSave } = productSave

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const dispatch = useDispatch()

    const openModal = (product) => {
        setmodalVisible(true)
        if(product){
            setId(product._id)
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setRating(product.rating)
            setNumReviews(product.numReviews)            
        }
    }
    
    useEffect(()=>{
        if(successSave){
            setmodalVisible(false)
        }
        dispatch(listProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[successSave, successDelete])
    
    const submitHandler=(e)=>{
        e.preventDefault()
        const newProduct={
            id,
            name, 
            price, 
            image, 
            brand, 
            category, 
            description, 
            countInStock, 
            rating, 
            numReviews              
        }
        dispatch(saveProduct(newProduct))
    }

    const deleteHandler=(product)=>{
        dispatch(deleteProduct(product._id))
    }

    return (
        loading||loadingSave||loadingDelete?<div>Loading...</div>:
        error||errorSave||errorDelete?<div>{error}</div>:
            <div className='contentMargined'>        
                <div className='productHeader'>
                    <h3>Products</h3>
                    <button className='button primary' onClick={() =>openModal()}>Create Product</button>
                </div>
                {modalVisible?
                    <CreateProduct 
                        id={id}
                        setName={setName}
                        name={name}
                        setPrice={setPrice}
                        price={price}
                        setImage={setImage}
                        image={image}
                        setBrand={setBrand}
                        brand={brand}
                        setCategory={setCategory}
                        category={category}
                        setCountInStock={setCountInStock}
                        countInStock={countInStock}
                        setDescription={setDescription}
                        description={description}
                        setmodalVisible={setmodalVisible}
                        openModal={openModal}
                        submitHandler={submitHandler}
                    />
                    :
                    <ProductList 
                        products={products}
                        openModal={openModal}
                        deleteHandler={deleteHandler}
                    />
                }
            </div>
    )
}

function CreateProduct(props){

    const {
        id,
        setmodalVisible,
        setName,
        name,
        setPrice,
        price,
        setImage,
        image,
        setBrand,
        brand,
        setCategory,
        category,
        setCountInStock,
        countInStock,
        setDescription,
        description,
        submitHandler
    } = props

    return(
        <div className='contentCenter'>
            <form className='form' onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <FormFieldHeader 
                        text={'Create Product'}
                    />
                    <FormField 
                        name={'name'} 
                        value={name} 
                        type={'text'} 
                        setState={setName}
                    />
                    <FormField 
                        name={'Price'} 
                        value={price} 
                        type={'number'} 
                        setState={setPrice}
                    />
                    <FormField 
                        name={'image'} 
                        value={image} 
                        type={'text'} 
                        setState={setImage}
                    />
                    <FormField 
                        name={'brand'} 
                        value={brand} 
                        type={'text'} 
                        setState={setBrand}
                    />
                    <FormField 
                        name={'category'} 
                        value={category} 
                        type={'text'} 
                        setState={setCategory}
                    />
                    <FormField 
                        name={'countInStock'} 
                        value={countInStock} 
                        type={'number'} 
                        setState={setCountInStock}
                    />
                    <FormFieldText 
                        name={'description'} 
                        value={description} 
                        type={'text'} 
                        setState={setDescription}
                    />
                    <li>
                        <button type='submit' className='button primary fullWidth'>{id?"Update":"Create"}</button>
                    </li>
                    <li>
                        <button type='button' onClick={e => setmodalVisible(false)} className='button secondary fullWidth'>Back</button>
                    </li>
                </ul>
            </form>
        </div>  
    )
}

function ProductList({products, openModal, deleteHandler}){

    return(
        <div className='content'>
            <table className='table fullWidth'>
                <thead>
                    <tr>
                        <TableHeader text={'ID'}/>
                        <TableHeader text={'NAME'}/>
                        <TableHeader text={'PRICE'}/>
                        <TableHeader text={'CATEGORY'}/>
                        <TableHeader text={'BRAND'}/>
                        <TableHeader text={'ACTION'}/>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <Product 
                            product={product} 
                            openModal={openModal}
                            deleteHandler={deleteHandler}
                        />                      
                    )}
                </tbody>  
            </table>                
        </div>  
    )
}

function Product({product, openModal, deleteHandler}){
    return(
        <tr key={product._id}>
            <TableItem text={product._id}/>
            <TableItem text={product.name}/>
            <TableItemPrice price={product.price}/>
            <TableItem text={product.category}/>
            <TableItem text={product.brand}/>
            <td className='productsActions'>
                <button className='button' onClick={()=>openModal(product)}>Edit</button>    
                {' '}
                <button className='button secondary' onClick={()=>deleteHandler(product)}>Delete</button>    
            </td>  
        </tr> 
    )
}

