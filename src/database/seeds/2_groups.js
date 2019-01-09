exports.seed = function(knex, Promise) {
  return knex('groups').del()
    .then(function () {
      return knex('groups').insert([
        {image: '', name: 'Filmes de Ação', description: ''},
        {image: '', name: 'Filmes de Aventura', description: ''},
        {image: '', name: 'Filmes de Drama', description: ''},
        {image: '', name: 'Filmes de Comédia', description: ''},
        {image: '', name: 'Filmes de Desenho', description: ''},
        {image: '', name: 'Filmes de Suspense', description: ''},
        {image: '', name: 'Filmes de Românce', description: ''},
        {image: '', name: 'Filmes de Faroeste', description: ''},
        {image: '', name: 'Filmes de Terror', description: ''}
      ]);
    });
};
