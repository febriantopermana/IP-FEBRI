const { User } = require("../models/index");
const { comparePassword } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");

class UserController {
    static async registerUser(req, res) {
        try {
            const { userName, email, password } = req.body;
            if (!userName) throw { name: 'UserNameRequired' }
            if (!email) throw { name: 'EmailRequired' }
            if (!password) throw { name: 'PasswordRequired' }

            const user = await User.create({ userName, email, password });
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            res.json(error)
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: 'EmailRequired' }
            if (!password) throw { name: 'PasswordRequired' }

            const user = await User.findOne({
                where: { email }
            })
            if (!user) throw { name: 'InvalidEmailPassword' }

            const checkPassword = comparePassword(password, user.password)
            if (!checkPassword) throw { name: 'InvalidEmailPassword' }

            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token })
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = UserController