const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name:{type: String, required: true},
    rating:{type: Number, default:0},
    comment:{type: String},
    productId:{type: String, required: true},
    userId:{type: String, required:true}
},{
    timestamps: true
})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    countInStock: {type: Number, default: 0, required: true},
    description: {type: String, required: true},
    gender: {type: String, default:'both'},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},
    reviews:[reviewSchema]
}) 

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel