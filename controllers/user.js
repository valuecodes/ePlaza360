const User = require('../models/userModel')
const {getToken} = require('../util')

// @desc      Signin
// @route     POST /signin
// @ access   Public
exports.userSignin = async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
            reviews: signinUser.reviews
        })
    }else{
        res.status(401).send({msg: 'Invalid Email or password'})
    }
}

// @desc      Register
// @route     POST /register
// @ access   Public
exports.userRegister = async (req, res)=>{
    try{
        const user= new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        })
        const newUser = await user.save()
        if(newUser){
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
        
    } catch(err){
        res.status(401).send({msg: 'Invalid user data'})
    }
}

// @desc      User update
// @route     PUT /
// @ access   Public
exports.userUpdate = async (req, res)=>{
    const userId = req.params.id
    const user = await User.findById(userId)
    if(user){
        if(
            req.body.currentPassword&&user.password!==req.body.currentPassword
        ){
            return res.status(404).send({message: 'Current password is wrong'})
        }
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email 
        user.password = req.body.newPassword || user.password
        const updatedUser = await user.save()
        res.send({message: 'User updated', data: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser),
            reviews: updatedUser.reviews
        }})
    }else{
        res.send(404).send({msg: 'User not found'})
    }
}


// @desc      Create admin
// @route     GET /createadmin
// @ access   
// exports.createAdmin = async (req, res)=>{
//     try{
//         const user = new User({
//             name: '********',
//             email: '***************',
//             password: '****',
//             isAdmin: true
//         })

//         const newUser = await user.save()
//         res.send(newUser)
//     } catch(err){
//         res.status(401).send({msg: err.message})
//     }
// }