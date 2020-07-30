const Product = require('../models/productModel')
const User = require('../models/userModel')

// @desc      Get products
// @route     GET /
// @ access   Public
exports.products = async(req, res)=>{
    const category = req.query.category ? {category:req.query.category}:{}
    const searchKeyword = req.query.searchKeyword?{
        name : new RegExp(req.query.searchKeyword,'i')
    } : {}
    const sortOrder = req.query.sortOrder ? (req.query.sortOrder === 'lowest'?{price: 1}:{price: -1}):
    {_id:-1}
    const products = await Product.find({...category, ...searchKeyword}).sort(sortOrder)
    res.send(products)
}

// @desc      Get product details
// @route     GET /:id
// @ access   Public
exports.productDetails = async(req, res) =>{
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(product){
        res.status(200).send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
}

// @desc      Save product
// @route     POST /
// @ access   Admin auth
exports.saveProduct = async(req, res) =>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        countInStock: req.body.countInStock,
        description: req.body.description,
    })
    const newProduct = await product.save()
    if(product){
        return res.status(201).send({message: 'New product created', data: newProduct})
    }
    return res.status(500).send({message: 'Error in creating product'})
}

// @desc      Update product
// @route     PUT /:id
// @ access   Admin Auth
exports.updateProduct = async (req, res) =>{
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(product){
        product.name = req.body.name
        product.price = req.body.price
        product.brand = req.body.brand
        product.category = req.body.category
        product.countInStock = req.body.countInStock
        product.description = req.body.description     
        const updatedProduct = await product.save()
        return res.status(200).send({message: 'Product updated', data: updatedProduct})
    }     
    return res.status(500).send({message: 'Error in updating product'})
}

// @desc      Delete product
// @route     DELETE /:id
// @ access   Admin Auth
exports.deleteProduct = async (req, res) =>{
    const productId = req.params.id
    const deletedProduct = await Product.findById(productId)
    if(deletedProduct){
        await deletedProduct.remove()
        return res.send({message:'Product deleted'})
    }else{
        return res.send({message:'Error in Deletion'})
    }
}

// @desc      Post review
// @route     POST /:id/reviews
// @ access   Auth
exports.postReview = async (req, res) => {
    const product = await Product.findById(req.params.id)
    const user = await User.findById(req.user._id)      

    let userReview = user.reviews.findIndex(review => review.productId===req.params.id) 
    if(product.reviews.length && user.reviews.length && userReview!==-1){

        let newRating = product.reviews.reduce((a, c) => a + c.rating
        ,0) / product.reviews.length

        let productUpdate =  await Product.findOneAndUpdate(
            {_id:req.params.id,
                reviews: {
                    $elemMatch: {
                        userId: req.user._id
                    }
                }
            },{$set:{
                "reviews.$.comment": req.body.comment,
                "reviews.$.rating": req.body.rating,
                "rating": newRating
                }
            },
            {upsert: true, new: true, useFindAndModify: false},
        )
        
        let userUpdate =  await User.findOneAndUpdate(
            {_id:req.user._id,
                reviews: {
                    $elemMatch: {productId: req.params.id}
                }
                },{$set:{
                    "reviews.$.comment": req.body.comment,
                    "reviews.$.rating": req.body.rating,
                }     
            },{upsert: true, new: true, useFindAndModify: false},
        )
        
        if(userUpdate&&productUpdate){
            return res.status(201).send({
                data: productUpdate.reviews[productUpdate.reviews.length-1], 
                message: 'Review saved succesfully'
            })
        }
    }

    if(product&&user){

            const review = {
                name: req.body.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
                productId: product._id,
                userId: user._id
            }
            product.reviews.push(review)
            user.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((a, c) => a + c.rating,0) / product.reviews.length
            const updatedProduct = await product.save()
            await user.save()
            res.status(201).send({
                data: updatedProduct.reviews[updatedProduct.reviews.length-1], 
                message: 'Review saved succesfully'
            })
     }else{
        res.status(404).send({message: 'Product or user not found'})
     }
}