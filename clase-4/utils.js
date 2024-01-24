import { createRequire } from 'node:module'
// Como leer un json en ESMOdules recomendado por ahora
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)
