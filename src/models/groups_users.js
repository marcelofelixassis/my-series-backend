const Bookshelf = require('../bookshelf');

class GroupUser extends Bookshelf.Model{
  
  get tableName() { return 'groups_users'; }

};
module.exports = Bookshelf.model('GroupUser', GroupUser);