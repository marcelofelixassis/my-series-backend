exports.up = function(knex, Promise) {
    return knex.schema.createTable('series_groups', (t) => {
        t.increments('id').primary();
        t.integer('fk_series', 10).unsigned().notNullable().index().references('id').inTable('series');
        t.integer('fk_groups', 10).unsigned().notNullable().index().references('id').inTable('groups');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('series_groups');
};
