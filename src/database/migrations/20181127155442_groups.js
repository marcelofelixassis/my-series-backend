exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups', (t) => {
        t.increments('id').primary();
        t.string('name', 30).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups');
};