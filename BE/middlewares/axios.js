const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://api.jikan.moe/v4/'
  });

module.exports = { instance }