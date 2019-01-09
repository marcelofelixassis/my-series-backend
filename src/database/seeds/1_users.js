const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      let password = bcrypt.hashSync("admin");

      return knex('users').insert([
        {name: "Marcelo Félix", email: "marcelofelix.af@gmail.com", password: password},
        {name: "Leonardo Marco", email: "leonardomarco@email.com", password: password},
        {name: "Juliano Estanormal", email: "julianoestanormal@email.com", password: password}
      ]);
    });
};
