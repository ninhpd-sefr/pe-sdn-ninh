const jwt = require('jsonwebtoken')

const generateToken = async (payload) => {
    return jwt.sign(payload, global.config.jwt.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

const verifyToken = async (token) => {
    return jwt.verify(token, global.config.jwt.ACCESS_TOKEN_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}