const Bookshelf = require('../bookshelf');
const Serie = require('./serie');
const User = require('./user');

class Group extends Bookshelf.Model{
  
  get tableName() { return 'groups'; }

  users() {
    return this.belongsToMany(User, 'groups_users', 'group_id','user_id');
  }

  series() {
    return this.belongsToMany(Serie, 'groups_series', 'group_id','serie_id');
  }

};
module.exports = Bookshelf.model('Group', Group);