const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const data = require('./data')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.json())

connectDB()

const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const payRoute = require('./routes/payRoute')
const uploadRoute = require('./routes/uploadRoute')

app.use('/api/products', productRoute);
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/config/paypal', payRoute)
app.use('/api/uploads', uploadRoute)
app.use('/uploads', express.static(path.join(__dirname, '/./uploads')))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))