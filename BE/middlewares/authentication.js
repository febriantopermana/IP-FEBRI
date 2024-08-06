const { verifyToken } = require("../utils/jwt")
const { User } = require(`../models/index`)

async function authentication (req, res, next) {
    try {
        const access_token = req.headers.authorization
        if(!access_token) throw { name: 'Unauthorized' }

        const [type, token] = access_token.split(' ')
        if (type !== `Bearer`) throw { name: `Unauthorized` }

        const payload = verifyToken(token)

        const user = await User.findByPk(payload.id)
        if(!user) throw { name: 'Unauthorized' }

        req.user = {
            UserId: user.id
        }

        next()
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    authentication
}