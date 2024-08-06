require('dotenv').config()

const express = require('express')
const { getAllAnimes, getAnimeById } = require('./controllers/animesController')
const { registerUser, loginUser } = require('./controllers/usersController')
const { authentication } = require('./middlewares/authentication')
const { addAnime } = require('./controllers/userAnimeListController')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Home Page')
// })
app.get('/', getAllAnimes)
app.get('/:id', getAnimeById)
app.post('/register', registerUser)
app.post('/login', loginUser)
app.post('/animes/:id', authentication, addAnime)

app.listen(port, () => {
    console.clear()
    console.log(`Example app listening on port ${port}`)
})