const { UserAnimeList } = require("../models/index");

async function userAuthorization(req, res, next) {
    try {
        const { UserId } = req.user
        const { id } = req.params
        const anime = await UserAnimeList.findByPk(id)
        if (!anime) throw { name: `ListNotFound` }

        if (UserId !== anime.UserId) throw { name: `Forbidden` }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { userAuthorization }