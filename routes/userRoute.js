const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.get('/createadmin', async (req, res)=>{
    try{
        const user = new User({
            name: '********',
            email: '***************',
            password: '****',
            isAdmin: true
        })

        const newUser = await user.save()
        res.send(newUser)
    } catch(err){
        res.status(401).send({msg: err.message})
    }
})

module.exports = router