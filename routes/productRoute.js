const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/:id', (req, res) => {
    const productId = req.params.id
    const product = data.find(product => Number(product._id)===Number(productId))
    if(product){
        res.status(200).send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

router.get('/', (req, res) =>{
    res.send(data)
})


module.exports = router