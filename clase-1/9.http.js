const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Mundo')
})

const desiredPort = process.env.PORT ?? 3000

console.log(process.env)

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
