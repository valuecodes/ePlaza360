const express = require('express')
const dotenv = require('dotenv').config()
const data = require('./data')
const app = express()

app.get('/api/products', (req, res) =>{
    console.log('test')
    res.send(data)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))