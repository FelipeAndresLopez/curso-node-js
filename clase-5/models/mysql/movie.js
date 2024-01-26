import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE name LIKE ?', [genre]
      )
      if (!genres.length) return []

      const [{ id }] = genres
      const [movies] = await connection.query(`
        SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate, name genre FROM movie
        INNER JOIN movie_genres ON movie_id = id
        INNER JOIN genre ON genre.id = genre_id
        WHERE movie_genres.genre_id = ?
       `, [id])
      return movies
    }

    const [movies] = await connection.query(`
      SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate, name genre FROM movie
      INNER JOIN movie_genres ON movie_id = id
      INNER JOIN genre ON genre.id = genre_id
    `)
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(`
      SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate, name genre
      FROM movie
      INNER JOIN movie_genres ON movie_id = id
      INNER JOIN genre ON genre.id = genre_id
      WHERE movie.id = UUID_TO_BIN(?)
    `, [id])

    if (!movie) return null
    return movie
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, rate, genre: genres } = input
    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    if (genres.length > 0) {
      try {
        genres.forEach(async (genre) => {
          const [genreResult] = await connection.query('SELECT id FROM genre WHERE name LIKE ?', [genre])
          const [{ id }] = genreResult
          await connection.query(`
            INSERT INTO movie_genres (movie_id, genre_id)
            VALUES (UUID_TO_BIN(?), ?)`, [uuid, id])
        })
      } catch (error) {
        throw new Error(error)
      }
    }

    try {
      await connection.query(`
        INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
      [uuid, title, year, director, duration, poster, rate])
    } catch (error) {
      throw new Error(error)
    }

    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
      FROM movie WHERE id = UUID_TO_BIN(?)`, [uuid]
    )

    return movie[0]
  }

  static async delete ({ id }) {
    const [result] = await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id]
    )

    // Removes the relation between movie and genre
    await connection.query('DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)', [id])

    if (!result.affectedRows) return false
    return true
  }

  /**
   * Update a movie with the given id and input data.
   *
   * @param {object} id - The id of the movie to update
   * @param {object} input - The new data for the movie
   * @return {Promise<object>} The updated movie
   */
  static async update ({ id, input }) {
    // TODO: add the movie genre to the movie update
    const { title, year, director, duration, poster, rate } = input
    console.log('test')
    await connection.query(`
      UPDATE movie
      SET title = IFNULL(?, title),
      year = IFNULL(?, year),
      director = IFNULL(?, director),
      duration = IFNULL(?, duration),
      poster = IFNULL(?, poster),
      rate = IFNULL(?, rate)
      WHERE id = UUID_TO_BIN(?)`, [title, year, director, duration, poster, rate, id]
    )
    return this.getById({ id })
  }
}
