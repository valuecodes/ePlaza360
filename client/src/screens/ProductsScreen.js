import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { 
    saveProduct, 
    listProducts, 
    deleteProduct 
} from '../actions/productActions';
import { 
    FormField, 
    FormFieldText, 
    FormFieldHeader,
    FormFieldOptions
} from '../components/FormComponents'
import {
    TableHeader,
    TableItem,
    TableItemPrice
} from '../components/TableComponents'
import categories from '../components/productCategories'

export default function ProductsScreen(props) {

    const [modalVisible, setmodalVisible] = useState(false)

    const [product, setProduct] = useState({
        id: '',
        name: '',
        price: '',
        image: '',
        brand: '',
        category: '',
        subCategory: '',
        description: '',
        countInStock: '',
        rating: '',
        numReviews: '',
        gender: '',
        uploading:false
    })

    const productList = useSelector(state => state.productList)
    const {loading, products, error } = productList

    const productSave = useSelector(state => state.productSave)
    const {loading: loadingSave, success: successSave, error: errorSave } = productSave

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const dispatch = useDispatch()

    const openModal = (currentProduct) => {
        setmodalVisible(true)
        if(currentProduct){
            setProduct(currentProduct)         
        }
    }
    
    useEffect(()=>{
        if(successSave){
            setmodalVisible(false)
        }
        dispatch(listProducts({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[successSave, successDelete])
    
    const submitHandler=(e)=>{
        e.preventDefault()
        const newProduct={
            id: product._id,
            name: product.name, 
            price: product.price, 
            image: product.image, 
            brand: product.brand, 
            category: product.category, 
            subCategory: product.subCategory,
            description: product.description, 
            countInStock: product.countInStock, 
            rating: product.rating, 
            numReviews: product.numReviews,        
            gender: product.gender,      
        }
        dispatch(saveProduct(newProduct))
    }

    const deleteHandler=(product)=>{
        dispatch(deleteProduct(product._id))
    }

    const uploadFileHandler=(e)=>{
        const file = e.target.files[0]
        const bodyFormData = new FormData()
        bodyFormData.append('image',file)
        setProduct({...product,uploading:true})        
        axios.post('/api/uploads', bodyFormData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(response =>
            setProduct({...product,image:response.data,uploading:false})
        ).catch(err => {
            console.log(error)
            setProduct({...product,uploading:false})        
        })
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
                        product={product}
                        setProduct={setProduct}
                        setmodalVisible={setmodalVisible}
                        openModal={openModal}
                        submitHandler={submitHandler}
                        uploadFileHandler={uploadFileHandler}
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
        product,
        setProduct,
        setmodalVisible,
        submitHandler,
        uploadFileHandler
    } = props

    const subCategories=product.category?
        categories.filter(category => category.name === product.category)[0].values
    :[]

    return(
        <div className='contentCenter'>
            <form className='form' onSubmit={submitHandler}>
                <ul className='formContainer'>
                    <FormFieldHeader 
                        text={'Create Product'}
                    />
                    <FormField 
                        name={'name'} 
                        value={product.name} 
                        type={'text'} 
                        state={product}
                        setState={setProduct}
                    />
                    <FormField 
                        name={'price'} 
                        value={product.price} 
                        type={'number'} 
                        state={product}                        
                        setState={setProduct}
                    />
                    <FormField 
                        name={'image'} 
                        value={product.image} 
                        type={'text'} 
                        state={product}                        
                        setState={setProduct}
                    />
                    <input type='file' onChange={uploadFileHandler}/>
                    {product.uploading && <div>Uploading...</div>}
                    <FormField 
                        name={'brand'} 
                        value={product.brand} 
                        type={'text'} 
                        state={product}                        
                        setState={setProduct}
                    />
                    <FormFieldOptions
                        name={'category'} 
                        value={product.category}
                        options={categories.map(category => category.name)} 
                        type={'text'} 
                        state={product}                        
                        setState={setProduct}
                    />
                    <FormFieldOptions
                        name={'subCategory'} 
                        value={product.subCategory}
                        options={subCategories} 
                        type={'text'} 
                        state={product}                        
                        setState={setProduct}
                    />
                    <FormField 
                        name={'countInStock'} 
                        value={product.countInStock} 
                        type={'number'} 
                        state={product}                        
                        setState={setProduct}
                    />                    
                    <FormFieldOptions
                        name={'gender'} 
                        value={product.gender}
                        options={['Men','Women','Both']} 
                        type={'text'} 
                        state={product}                        
                        setState={setProduct}
                    />
                    <FormFieldText 
                        name={'description'} 
                        value={product.description} 
                        type={'text'} 
                        state={product}                        
                        setState={setProduct}
                    />

                    <li>
                        <button type='submit' className='button primary fullWidth'>{product._id?"Update":"Create"}</button>
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

