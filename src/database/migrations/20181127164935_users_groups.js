exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_groups', (t) => {
        t.increments('id').primary();
        t.integer('fk_users', 10).unsigned().notNullable().index().references('id').inTable('users');
        t.integer('fk_groups', 10).unsigned().notNullable().index().references('id').inTable('groups');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_groups');
};