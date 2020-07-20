const express = require('express')
const router = express.Router()
const {userSignin, userRegister, createAdmin} = require('../controllers/user')

router
    .route('/signin')
    .post(userSignin)

router
    .route('/register')
    .post(userRegister)

// router  
//     .route('/createadmin')
//     .get(createAdmin)

module.exports = router