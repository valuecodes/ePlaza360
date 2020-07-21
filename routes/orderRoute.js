const express = require('express')
const {isAuth, isAdmin} = require('../util')
const router = express.Router()
const {
    createOrder, 
    getOrder, 
    payOrder,
    myOrders
} = require('../controllers/order')

router 
    .route('/')
    .post(isAuth,createOrder)

router  
    .route('/myOrders')
    .get(isAuth, myOrders)

router 
    .route('/:id')
    .get(isAuth, getOrder)

router  
    .route('/:id/pay')
    .put(isAuth, payOrder)



module.exports = router