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
        trackPackage:{
            status: 0,
            statusText:'Order Sent',
            orderReceived: false,
            inTransit: false,
            readyToPickUp: false,
            orderDelivered: false
        }
    })

    const newOrderCreated = await newOrder.save()
    res.status(201).send({message: 'New Order Created', data: newOrderCreated})
}

// @desc      Pay order
// @route     PUT /:id
// @ access   Auth
exports.payOrder = async (req,res) => {
    const order = await Order.findById(req.params.id)

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

// @desc      Get all orders
// @route     GET /
// @ access   Auth Admin
exports.getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user')
    res.send(orders)
}

// @desc      My orders
// @route     GET /mine
// @ access   Auth
exports.myOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
}

// @desc      Delete order
// @route     DELETE /:id
// @ access   Auth Admin
exports.deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        const deletedOrder = await order.remove()
        return res.send(order)
    }else{
        return res.status(404).send({message: 'Order not found'})
    }
}

// @desc      Change order status
// @route     PUT /:id/status
// @ access   Auth
exports.changeOrderStatus = async (req, res) => {
    
    const order = await Order.findOne({_id: req.params.id})

    if(order){
        let phase=req.body.phase;
        let phaseText=''

        switch(phase){
            case 1:
                phaseText='Order Received'
                break
            case 2:
                phaseText='In Transit'
                break
            case 3:
                phaseText='Ready for pickup'
                break
            case 4:
                phaseText='Order Delivered'
                break
            default : return ''
        }

        
        order.trackPackage.status = phase
        order.trackPackage.statusText = phaseText
        order.trackPackage[phase]=true

        const updatedOrder = await order.save()
        res.send({message: 'Order Saved.',order: updatedOrder})
    }else{
        res.status(404).send({message: 'Order not found'})
    }
}