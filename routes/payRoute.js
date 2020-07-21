const express = require('express')
const router = express.Router()

router.get('/',(req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

module.exports = router