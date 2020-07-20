const express = require('express')
const {isAuth, isAdmin} = require('../util')
const router = express.Router()
const {createOrder, getOrder} = require('../controllers/order')

router 
    .route('/')
    .post(isAuth,createOrder)

router 
    .route('/:id')
    .get(isAuth, getOrder)

module.exports = router