import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://ipfebri.febri-project.store/'
  });

export default instance