const { UserAnimeList } = require("../models/index");
const { instance } = require("../utils/axios");

class userAnimeListController {
    static async addAnime (req, res) {
        try {
            const { UserId } = req.user
            const { id } = req.params
            const { data } = await instance.get(`/anime/${id}`)
            const anime = await UserAnimeList.create({
                UserId,
                AnimeId: id,
                status: "ongoing",
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
}

module.exports = userAnimeListController