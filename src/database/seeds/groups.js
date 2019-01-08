exports.seed = function(knex, Promise) {
  return knex('groups').del()
    .then(function () {
      return knex('groups').insert([
        {name: 'Ação'},
        {name: 'Aventura'},
        {name: 'Drama'},
        {name: 'Comédia'},
        {name: 'Desenho'},
        {name: 'Suspense'},
        {name: 'Românce'},
        {name: 'Faroeste'},
        {name: 'Terror'}
      ]);
    });
};
