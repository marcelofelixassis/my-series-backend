exports.up = function(knex, Promise) {
    return knex.schema.createTable('series', (t) => {
        t.increments('id').primary();
        t.string('name', 40).notNullable();
        t.string('description', 40).notNullable();
        t.string('image', 200);
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('series');
};