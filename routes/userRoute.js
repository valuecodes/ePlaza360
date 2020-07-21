const express = require('express')
const router = express.Router()
const { isAuth } = require('../util')
const {userSignin, userRegister, userUpdate, createAdmin} = require('../controllers/user')

router
    .route('/signin')
    .post(userSignin)

router
    .route('/register')
    .post(userRegister)

router
    .route('/:id')
    .put(isAuth,userUpdate)

// router  
//     .route('/createadmin')
//     .get(createAdmin)

module.exports = router