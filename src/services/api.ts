import axios from 'axios'

const RecipePuppy = axios.create({
  baseURL: 'http://www.recipepuppy.com/api/',
})

const giphyAPI = axios.create({
  baseURL: 'http://api.giphy.com/v1/gifs/',
})

export { RecipePuppy, giphyAPI }
