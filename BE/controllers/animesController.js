const { instance } = require("../utils/axios");

class AnimesController {
    static async getAllAnimes(req, res) {
        try {
            let { data } = await instance.get('/anime')
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    static async getAnimeById(req, res) {
        try {
            const { id } = req.params
            let { data } = await instance.get(`/anime/${id}/full`)
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
}

module.exports = AnimesController