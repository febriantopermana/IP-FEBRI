const { instance } = require("../utils/axios");

class AnimesController {
    static async getAllAnimes(req, res, next) {
        try {
            // Destructure and default values for query parameters
            let { q = '', page = 1 } = req.query;
            
            // Ensure page is a positive integer
            page = parseInt(page, 10);
            if (isNaN(page) || page <= 0) {
                return res.status(400).json({ error: 'Invalid page number' });
            }

            // Ensure query parameter is properly encoded
            const query = encodeURIComponent(q);
            const url = `/anime?sfw&page=${page}&q=${query}`;

            // Make the request to the external API
            const { data } = await instance.get(url);
            
            // Send the successful response
            res.status(200).json(data);
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