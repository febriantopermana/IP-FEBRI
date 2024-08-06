require('dotenv').config()

const express = require('express')
const { getAllAnimes, getAnimeById } = require('./controllers/animesController')
const { registerUser, loginUser } = require('./controllers/usersController')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home Page')
})
app.get('/animes', getAllAnimes)
app.get('/animes/:id', getAnimeById)
app.post('/register', registerUser)
app.post('/login', loginUser)

app.listen(port, () => {
    console.clear()
    console.log(`Example app listening on port ${port}`)
})