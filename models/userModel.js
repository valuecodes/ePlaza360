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

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique:true, dropDups: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default:false},
    reviews: [reviewSchema]
}) 

const userModel = mongoose.model('User', userSchema)

module.exports = userModel