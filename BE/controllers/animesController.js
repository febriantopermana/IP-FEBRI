const { instance } = require("../utils/axios");

class AnimesController {
    static async getAllAnimes(req, res, next) {
        try {
            const { q, page } = req.query
            let { data } = await instance.get(`/anime?sfw&page=${page}&q=${q}`)    
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAnimeById(req, res, next) {
        try {
            const { id } = req.params
            let { data } = await instance.get(`/anime/${id}/full`)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AnimesController