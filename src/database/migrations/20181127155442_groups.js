exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups', (t) => {
        t.increments('id').primary();
        t.string('image', 100);
        t.string('name', 30).notNullable();
        t.string('description', 255);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups');
};