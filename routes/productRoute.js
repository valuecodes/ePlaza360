const express = require('express')
const router = express.Router()

const { 
    products, 
    productDetails,
    saveProduct,
    updateProduct,
    deleteProduct 
} = require('../controllers/product')

router
    .route('/:id')
    .get(productDetails)
    .put(updateProduct)
    .delete(deleteProduct)

router
    .route('/')
    .get(products)
    .post(saveProduct)

module.exports = router