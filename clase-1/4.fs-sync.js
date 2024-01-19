const { readFileSync } = require('node:fs');


console.log('Leyendo el primer archivo')
const text1 = readFileSync('archivo.txt', 'utf-8')

console.log('primer texto:', text1)


console.log('haciendo cosas que mientras se lee archivo')

console.log('Leyendo el segundo archivo')
const text2 = readFileSync('archivo2.txt', 'utf-8')


console.log('segundo texto:', text2)
