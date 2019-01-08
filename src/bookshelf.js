var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'series',
      charset: 'utf8'
    }
  });
  var bookshelf = require('bookshelf')(knex);
  bookshelf.plugin('registry');
  module.exports = bookshelf;
