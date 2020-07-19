const jwt = require('jsonwebtoken')

const getToken = (user) =>{

    const signinUser={
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    
    return jwt.sign(signinUser, process.env.JWT_SECRET,{
        expiresIn: '48h'
    })
}

module.exports = getToken