module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'series',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  }
};