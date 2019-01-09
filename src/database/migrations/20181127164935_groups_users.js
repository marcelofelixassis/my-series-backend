exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups_users', (t) => {
        t.increments('id').primary();
        t.integer('fk_groups', 10).unsigned().notNullable().index().references('id').inTable('groups');
        t.integer('fk_users', 10).unsigned().notNullable().index().references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups_users');
};