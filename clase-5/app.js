import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

const PORT = process.env.PORT ?? 3000

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} on port http://localhost:${PORT}`)
  })
}
