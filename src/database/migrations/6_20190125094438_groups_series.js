exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups_series', (t) => {
        t.increments('id').primary();
        t.integer('group_id', 10).unsigned().notNullable().index().references('id').inTable('groups').onDelete('CASCADE');
        t.integer('serie_id', 10).unsigned().notNullable().index().references('id').inTable('series').onDelete('CASCADE');
        t.integer('score', 5).defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups_series');
};