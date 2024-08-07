const { UserAnimeList } = require("../models/index");
const { instance } = require("../utils/axios");

class userAnimeListController {
    static async addMyAnime(req, res) {
        try {
            const { UserId } = req.user;
            const { id } = req.params;
            const { data } = await instance.get(`/anime/${id}`);

            const findUserAnimeList = await UserAnimeList.findOne({
                where: {
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
            console.log(error)
            res.send(error)
        }
    }

    static async updateStatusMyAnime(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body

            let findUserAnimeList = await UserAnimeList.findOne({
                where: {
                    AnimeId: id
                }
            })

            await findUserAnimeList.update({ status });
            res.status(200).json(findUserAnimeList);
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async updateNotesMyAnime(req, res) {
        try {
            const { id } = req.params;
            const { notes } = req.body

            if (!notes) throw { name: 'NotesEmpty' }

            let findUserAnimeList = await UserAnimeList.findOne({
                where: {
                    AnimeId: id
                }
            })

            await findUserAnimeList.update({ notes });
            res.status(200).json(findUserAnimeList);
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async removeMyAnime(req, res) {
        try {
            const { id } = req.params;

            let findUserAnimeList = await UserAnimeList.findOne({
                where: {
                    AnimeId: id
                }
            })

            await findUserAnimeList.destroy();
            res.status(200).json({ message: `Anime with title ${findUserAnimeList.title} has been removed`});
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = userAnimeListController