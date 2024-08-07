require('dotenv').config()

const express = require('express')
const { getAllAnimes, getAnimeById } = require('./controllers/animesController')
const { registerUser, loginUser, getProfile } = require('./controllers/usersController')
const { authentication } = require('./middlewares/authentication')
const { addMyAnime, updateStatusMyAnime, updateNotesMyAnime, removeMyAnime } = require('./controllers/userAnimeListController')
const errorHandlers = require('./middlewares/errorHandlers')
const { userAuthorization } = require('./middlewares/authorization')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Home Page')
// })
app.get('/animes', getAllAnimes)
app.get('/animes/:id', getAnimeById)
app.post('/register', registerUser)
app.post('/login', loginUser)
app.use(authentication)
app.get('/profile', getProfile)
app.post('/animes/:id', addMyAnime)
app.patch('/profile/:id', userAuthorization, updateStatusMyAnime)
app.put('/profile/:id', userAuthorization, updateNotesMyAnime)
app.delete('/profile/:id', userAuthorization, removeMyAnime)
app.use(errorHandlers)

app.listen(port, () => {
    console.clear()
    console.log(`Example app listening on port ${port}`)
})