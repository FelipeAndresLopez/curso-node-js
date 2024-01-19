// Esto solo en los modulos nativos
// que no tienen promises nativas

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)


const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo')
const file1 = fs.readFile('archivo.txt', 'utf-8')
  .then((text) => {
    console.log('primer texto:', text)
  })

console.log('haciendo cosas que mientras se lee archivo')

console.log('Leyendo el segundo archivo')
const file2 = fs.readFile('archivo2.txt', 'utf-8')
  .then(text => {
    console.log('segundo texto:', text)
  })
