const Bookshelf = require('../bookshelf');

class GroupUser extends Bookshelf.Model{
  
  get tableName() { return 'groups_users'; }

  static checkUserExistGroup(user_id, group_id) {
    return this.forge().where({
      user_id: user_id,
      group_id: group_id 
    }).fetch({require: true}).then((data) => {
      return data
    }).catch((err) => {
      return err.code;
    });
  }

};
module.exports = Bookshelf.model('GroupUser', GroupUser);