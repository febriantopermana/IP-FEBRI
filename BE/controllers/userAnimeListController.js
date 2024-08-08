const { UserAnimeList } = require("../models/index");
const { instance } = require("../utils/axios");

class userAnimeListController {
    static async addMyAnime(req, res, next) {
        try {
            const { UserId } = req.user;
            const { id } = req.params;
            const { data } = await instance.get(`/anime/${id}`);

            const findUserAnimeList = await UserAnimeList.findOne({
                where: {
                    UserId,
                    AnimeId: id
                }
            })      

            if (findUserAnimeList) {
                throw { name: 'AnimeAddedAlready' }
            }

            const anime = await UserAnimeList.create({
                UserId,
                AnimeId: id,
                title: data.data.titles[0].title,
                imageUrl: data.data.images.jpg["image_url"],
                type: data.data.type,
                animeUrl: data.data.url
            })
            res.status(201).json(anime)
        } catch (error) {
            next(error)
        }
    }

    static async updateStatusMyAnime(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body

            if (!status) throw { name: 'StatusEmpty' }

            let findUserAnimeList = await UserAnimeList.findByPk(id)
            if (!findUserAnimeList) throw { name: 'ListNotFound' }

            await findUserAnimeList.update({ status });
            res.status(200).json(findUserAnimeList);
        } catch (error) {
            next(error)
        }
    }

    static async updateNotesMyAnime(req, res, next) {
        try {
            const { id } = req.params;
            const { notes } = req.body

            if (!notes) throw { name: 'NotesEmpty' }

            let findUserAnimeList = await UserAnimeList.findByPk(id)
            if (!findUserAnimeList) throw { name: 'ListNotFound' }

            await findUserAnimeList.update({ notes });
            res.status(200).json(findUserAnimeList);
        } catch (error) {
            next(error)
        }
    }

    static async removeMyAnime(req, res, next) {
        try {
            const { id } = req.params;

            let findUserAnimeList = await UserAnimeList.findByPk(id)
            if (!findUserAnimeList) throw { name: 'ListNotFound' }

            await findUserAnimeList.destroy();
            res.status(200).json({ message: `Anime with title ${findUserAnimeList.title} has been removed` });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userAnimeListController