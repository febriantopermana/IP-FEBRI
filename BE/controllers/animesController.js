const { instance } = require("../middlewares/axios");

class AnimesController {
    static async getAllAnimes(req, res) {
        try {
            let { data } = await instance.get('/anime')
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AnimesController