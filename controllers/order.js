const Order = require('../models/orderModel')

// @desc      Create Order
// @route     POST /
// @ access   Auth
exports.createOrder = async (req,res) => {
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
}

// @desc      Pay order
// @route     PUT /:id
// @ access   Auth
exports.payOrder = async (req,res) => {
    const order = await Order.findById(req.params.id)
    console.log(order)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.payment={
            paymentMethod: 'paypal',
            paymentResult:{
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save()
        res.send({message: 'Order Paid.',order: updatedOrder})
    }else{
        res.status(404).send({message: 'Order not found'})
    }
}

// @desc      Get order
// @route     GET /:id
// @ access   Auth
exports.getOrder = async (req, res) => {
    const order = await Order.findOne({_id: req.params.id})
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Order not found'})
    }
}

// @desc      My orders
// @route     GET /mine
// @ access   Auth
exports.myOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
}