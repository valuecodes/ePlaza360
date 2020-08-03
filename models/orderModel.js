const mongoose = require('mongoose')

const shippingSchema = {
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
}

const paymentSchema = {
    paymentMethod: {type: String, required: true},
}

const orderItemsSchema = new mongoose.Schema({
    name: {type: String, required:true},
    qty: {type: Number, required:true},
    color: {type: String},
    size: {type: Number},
    image: {type: String, required:true},
    price: {type: String, required:true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
})

const packageTrackingSchema = {
    status: {type: String, default: 'Order sent'},
    orderReceived: {type: Boolean, default: false},
    orderReceivedAt: {type: Date},
    inTransit: {type: Boolean, default: false},
    inTransitAt: {type: Date},
    readyToPickup: {type: Boolean, default: false},
    readyToPickupAt: {type: Date},
    orderDelivered: {type: Boolean, default: false},
    orderDeliveredAt: {type: Date}
}

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems:[orderItemsSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice:{type: Number},
    taxPrice:{type: Number},
    shippingPrice:{type: Number},
    totalPrice:{type: Number},
    isPaid:{type: Boolean, default:false},
    paidAt:{type: Date},
    isDelivered:{type: Boolean, default:false},
    deliveredAt:{type: Date},
    trackPackage: packageTrackingSchema
},{
    timestamps: true
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports=orderModel