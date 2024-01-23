const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')

app.use(express.json())

// esto es equivalente a  app.use(express.json())
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutar la request y agregar la informacion en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  // res.status(200).send('<h1>Bienvenido a mi página de inicio</h1>')
  // res.json({ message: 'Bienvenido a mi página de inicio' })
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  const data = req.body
  res.status(201).json(data)
})

app.use((req, res) => {
  res.status(404).send('<h4>404</h4>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
