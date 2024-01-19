const fs = require('node:fs')

console.log('Leyendo el primer archivo')
const file1 = fs.readFile('archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('primer texto:', text)
})

console.log('haciendo cosas que mientras se lee archivo')

console.log('Leyendo el segundo archivo')
const file2 = fs.readFile('archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('segundo texto:', text)
})
