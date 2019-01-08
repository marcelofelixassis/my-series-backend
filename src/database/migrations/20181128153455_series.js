exports.up = function(knex, Promise) {
    return knex.schema.createTable('series', (t) => {
        t.increments('id').primary();
        t.string('name', 40).notNullable();
        t.string('photo', 40);
        t.integer('score');
        t.text('description');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('series');
};
