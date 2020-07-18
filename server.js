const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const data = require('./data')
const app = express()

connectDB()
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
const userRoute = require('./routes/userRoute')

app.use('/api/products', productRoute);
app.use('/cart', cartRoute)
app.use('/api/users', userRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))