const Bookshelf = require('../bookshelf');
const Group = require('./group');
class Serie extends Bookshelf.Model{
  
  get tableName() { return 'series'; }

  groups() {
    return this.belongsToMany(Group, 'groups_series', 'group_id','serie_id');
  }

};
module.exports = Bookshelf.model('Serie', Serie);