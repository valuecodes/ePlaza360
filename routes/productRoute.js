const express = require('express')
const router = express.Router()
const data = require('../data')
const Product = require('../models/productModel')
const {isAuth, isAdmin} = require('../util')

router.get('/:id', async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(product){
        res.status(200).send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

router.get('/', async(req, res) => {
    const products = await Product.find({})
    res.send(products)
})

router.post('/', isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        countInStock: req.body.countInStock,
        description: req.body.description,
    })
    const newProduct = await product.save()
    if(product){
        return res.status(201).send({message: 'New product created', data: newProduct})
    }
    return res.status(500).send({message: 'Error in creating product'})
})

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(product){
        product.name = req.body.name
        product.price = req.body.price
        product.brand = req.body.brand
        product.category = req.body.category
        product.countInStock = req.body.countInStock
        product.description = req.body.description     
        const updatedProduct = await product.save()
        return res.status(200).send({message: 'Product updated', data: updatedProduct})
    }     
    return res.status(500).send({message: 'Error in updating product'})
})

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id
    const deletedProduct = await Product.findById(productId)
    if(deletedProduct){
        await deletedProduct.remove()
        return res.send({message:'Product deleted'})
    }else{
        return res.send({message:'Error in Deletion'})
    }
})

module.exports = router