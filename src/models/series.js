var Bookshelf = require('../bookshelf');

class Series extends Bookshelf.Model{
  
  get tableName() {
    return 'series';
  };

};
module.exports = Bookshelf.model('Series', Series);