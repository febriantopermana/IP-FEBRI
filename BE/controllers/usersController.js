const { User } = require("../models/index");
const { comparePassword } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async registerUser(req, res, next) {
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
            next(error)
        }
    }

    static async loginUser(req, res, next) {
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
            next(error)
        }
    }

    static async loginByGoogle(req, res, next) {
        try {
            const { googleToken } = req.body
            if (!googleToken) throw { name: 'InvalidGoogleToken' }

            const client = new OAuth2Client();
            const client_id = process.env.GOOGLE_CLIENT_ID

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: client_id,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            // const userid = payload['sub'];
            // If the request specified a Google Workspace domain:
            // const domain = payload['hd'];

            const [ user ] = await User.findOrCreate({
                where: { email: payload.email },
                default: {
                    userName: payload["given_name"] + Date.now().toString().slice(0, 4),
                    email: payload.email,
                    password: "temp-" + Date.now().toString().slice(4, 8)
                }
            })

            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async getProfile(req, res, next) {
        try {
            const { UserId } = req.user
            const user = await User.findByPk(UserId, {
                attributes: {
                    exclude: ['password', 'GoogleToken']
                },
                include: 'UserAnimeLists'
            });
            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController