const { readFile } = require('node:fs/promises');

Promise.all([
  readFile('archivo.txt', 'utf-8'),
  readFile('archivo2.txt', 'utf-8')
]).then(([text1, text2]) => {
  console.log('primer texto:', text1)
  console.log('segundo texto:', text2)
})