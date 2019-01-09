exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', (t) => {
        t.string('id').primary();
        t.string('name', 40).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};