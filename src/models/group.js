const Bookshelf = require('../bookshelf');

class Group extends Bookshelf.Model{
  
  get tableName() { return 'groups'; }

  users() {
    return this.belongsToMany('User');
  }

};
module.exports = Bookshelf.model('Group', Group);