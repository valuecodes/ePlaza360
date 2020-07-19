const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const {getToken} = require('../util')

router.post('/signin', async (req, res) =>{

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    }else{
        re.status(401).send({msg: 'Invalid Email or password'})
    }
})

router.post('/register', async (req, res)=> {
    try{
        const user= new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        })
        const newUser = await user.save()
        if(newUser){
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
        
    } catch(err){
        res.status(401).send({msg: 'Invalid user data'})
    }
})

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