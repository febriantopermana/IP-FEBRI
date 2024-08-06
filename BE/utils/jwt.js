const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET

function signToken (payload) {
    return jwt.sign(payload, jwt_secret)
}

function verifyToken (token) {
    return jwt.verify(token, jwt_secret)
}

module.exports = {
    signToken,
    verifyToken
}