const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protected = asyncHandler(async (req, res, next) => {
    const x_access_token = req.headers['x-access-token']
    if (!x_access_token) {
        res.status(401)
        throw new Error('Token required')
    }
    const token = await jwt.verify(x_access_token, process.env.JWT_SECRET_KEY)
    if (!token) {
        res.status(401)
        throw new Error('Invalid token')
    }
    req.user = await User.findById(token.id).select('-password')
    next()
})

module.exports = { protected }