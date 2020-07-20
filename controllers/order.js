const Order = require('../models/orderModel')

// @desc      Create Order
// @route     POST /
// @ access   Auth
exports.createOrder = async (req,res) => {
    console.log(req.user)
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    })
    const newOrderCreated = await newOrder.save()
    res.status(201).send({message: 'New Order Created', data: newOrderCreated})
    console.log('creating order')
}

// @desc      Get order
// @route     GET /:id
// @ access   Auth Admin
exports.getOrder = async(req, res) => {
    const order = await Order.findOne({_id: req.params.id})
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Order not found'})
    }
}