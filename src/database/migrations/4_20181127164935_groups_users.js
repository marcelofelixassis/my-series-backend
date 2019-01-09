exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups_users', (t) => {
        t.increments('id').primary();
        t.integer('group_id', 10).unsigned().notNullable().index().references('id').inTable('groups');
        t.integer('user_id', 10).unsigned().notNullable().index().references('id').inTable('users');
        t.string('role_id', 255).notNullable().index().references('id').inTable('roles');
        t.boolean('star').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups_users');
};