const fs = require('node:fs') // a partir de la version 16 de Node se recomienda importar de esta manera

const stats = fs.statSync('archivo.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)
