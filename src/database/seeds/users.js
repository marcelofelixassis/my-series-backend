exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {name: "Marcelo Félix", token: "asodifjasodf234234s1", email: "marcelofelix@email.com", password: "202cb962ac59075b964b07152d234b70"},
        {name: "Leonardo Marco", token: "asodifjasodf234234s2", email: "leonardomarco@email.com", password: "202cb962ac59075b964b07152d234b70"},
        {name: "Juliano Estanormal", token: "asodifjasodf234234s3", email: "julianoestanormal@email.com", password: "202cb962ac59075b964b07152d234b70"}
      ]);
    });
};
