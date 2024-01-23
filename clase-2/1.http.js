const http = require('node:http')
const fs = require('node:fs')
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/about') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Acerca de mi</h1>')
  } else if (req.url === '/js.png') {
    fs.readFile('./js.png', (err, data) => {
      console.log(err)
      if (err) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1>Error 404: Imagen no encontrada :( </h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // Not Found
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Error 404: Pagina no encontrada :( </h1>')
  }
})

const desiredPort = process.env.PORT ?? 3000

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
