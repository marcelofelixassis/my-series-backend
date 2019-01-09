exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (t) => {
        t.increments('id').primary();
        t.string('name', 40).notNullable();
        t.string('email', 40).notNullable();
        t.string('password', 100).notNullable();
        t.string('password_reset_token', 100);
        t.datetime('password_reset_expires');
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.unique('email');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};