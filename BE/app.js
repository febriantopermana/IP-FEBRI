const express = require('express')
const { getAllAnimes } = require('./controllers/animesController')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home Page')
})
app.get('/animes', getAllAnimes)

app.listen(port, () => {
    console.clear()
    console.log(`Example app listening on port ${port}`)
})