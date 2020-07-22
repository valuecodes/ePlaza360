const express = require('express')
const router = express.Router()
const {isAuth, isAdmin} = require('../util')
const { 
    products, 
    productDetails,
    saveProduct,
    updateProduct,
    deleteProduct,
    postReview
} = require('../controllers/product')

router
    .route('/:id')
    .get(productDetails)
    .put(isAuth, isAdmin, updateProduct)
    .delete(isAuth, isAdmin, deleteProduct)

router
    .route('/')
    .get(products)
    .post(isAuth, isAdmin, saveProduct)

router  
    .route('/:id/reviews')
    .post(isAuth, postReview)

module.exports = router