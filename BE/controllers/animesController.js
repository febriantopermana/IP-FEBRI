const { instance } = require("../utils/axios");

class AnimesController {
    static async getAllAnimes(req, res, next) {
        try {
            let { q = '', page = 1 } = req.query;
            page = parseInt(page, 10);
            if (isNaN(page) || page <= 0) {
                return res.status(400).json({ error: 'Invalid page number' });
            }

            const query = encodeURIComponent(q);
            const url = `/anime?sfw&page=${page}&q=${query}`;

            const { data } = await instance.get(url);

            res.status(200).json(data);
        } catch (error) {
            if (error.isAxiosError) {
                console.error('Axios error:', {
                    message: error.message,
                    stack: error.stack,
                    response: error.response ? {
                        status: error.response.status,
                        data: error.response.data
                    } : null
                });
                res.status(error.response ? error.response.status : 500).json({
                    error: error.response ? error.response.data : 'Internal Server Error'
                });
            } else {
                console.error('Unexpected error:', {
                    message: error.message,
                    stack: error.stack
                });
                res.status(500).json({ error: 'Internal Server Error' });
            }
            next(error);
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