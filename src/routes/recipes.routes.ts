import { Router } from 'express'
import { RecipePuppy, giphyAPI } from '../services/api'

const recipesRoutes = Router()

interface recipesDTO {
  title: string
  ingredients: string
  link: string
  gif: string
}

recipesRoutes.get('/', async (request, response) => {
  const i = request.query.i
  const recipes: Array<recipesDTO> = []

  if (i) {
    const responseRecipes = await RecipePuppy.get('/', {
      params: {
        i: i,
      },
    })

    const recipesData = responseRecipes.data.results

    for (let x = 0; x < recipesData.length; x++) {
      const { title, ingredients, href } = recipesData[x]

      const giphy = await giphyAPI.get('/search', {
        headers: {
          api_key: '17RPf1rvfwMDa1QySHh72lPTiHAtBeyB',
        },
        params: {
          q: title,
          imit: 1,
        },
      })

      const image = giphy.data.data[0].images.preview_gif.url
      const recipe = { title, ingredients, link: href, gif: image }

      recipes.push(recipe)
    }

    return response.send({ keywords: i, recipes: recipes })
  }

  return response.send({ mensage: 'Sem ingrediente' })
})
export default recipesRoutes
