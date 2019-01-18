const Bookshelf = require('../bookshelf');

class User extends Bookshelf.Model{
  
  get tableName() { return 'users'; }

  groups() {
    return this.belongsToMany('Group');
  }

  static checkEmail(email) {
    return this.forge().where({
      email: email 
    }).fetch({require: true}).then((data) => {
      return data
    }).catch((err) => {
      return err.code;
    });
  }

  updatePasswordResetFields(token, expires) {
    this.save({
      password_reset_token: token,
      password_reset_expires: expires
    });
  }
  
};
module.exports = Bookshelf.model('User', User);