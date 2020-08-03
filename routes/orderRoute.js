const express = require('express')
const {isAuth, isAdmin} = require('../util')
const router = express.Router()
const {
    createOrder, 
    getOrder, 
    payOrder,
    myOrders,
    getOrders,
    deleteOrder,
    changeOrderStatus
} = require('../controllers/order')

router 
    .route('/')
    .post(isAuth,createOrder)
    .get(isAuth, isAdmin, getOrders)

router  
    .route('/myOrders')
    .get(isAuth, myOrders)

router 
    .route('/:id')
    .get(isAuth, isAdmin, getOrder)
    .delete(isAuth, isAdmin, deleteOrder)

router  
    .route('/:id/pay')
    .put(isAuth, payOrder)

router  
    .route('/:id/status')
    .put(isAuth, isAdmin, changeOrderStatus)



module.exports = router