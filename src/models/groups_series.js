const Bookshelf = require('../bookshelf');

class GroupSerie extends Bookshelf.Model{
  
  get tableName() { return 'groups_series'; }

  static checkSerieExistGroup(serie_id, group_id) {
    return this.forge().where({
        group_id: group_id,
        serie_id: serie_id
    }).fetch({require: true}).then((data) => {
      return data
    }).catch((err) => {
      return err.code;
    });
  }
};
module.exports = Bookshelf.model('GroupSerie', GroupSerie);