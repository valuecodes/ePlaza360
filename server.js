const express = require('express')
const dotenv = require('dotenv').config()
const data = require('./data')
const app = express()

const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')

app.use('/api/products', productRoute);
app.use('/cart', cartRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))