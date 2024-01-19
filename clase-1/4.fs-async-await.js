const { readFile } = require('node:fs/promises');


  (async () => {

    console.log('Leyendo el primer archivo')
    const text1 = await readFile('archivo.txt', 'utf-8')

    console.log('primer texto:', text1)


    console.log('haciendo cosas que mientras se lee archivo')

    console.log('Leyendo el segundo archivo')
    const text2 = await readFile('archivo2.txt', 'utf-8')


    console.log('segundo texto:', text2)
  })
