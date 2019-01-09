const Bookshelf = require('../bookshelf');

const User = require('./user');

class Group extends Bookshelf.Model{
  
  get tableName() { return 'groups'; }

  users() {
    return this.belongsToMany(User, 'groups_users').query({where: {user_id: this.get('id')}});
  }

};
module.exports = Bookshelf.model('Group', Group);