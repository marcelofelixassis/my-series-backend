const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      let password = bcrypt.hashSync("admin");

      return knex('users').insert([
        {name: "Marcelo Félix", email: "marcelofelix.af@gmail.com", password: password, image:""},
        {name: "Leonardo Marco", email: "leonardomarco@email.com", password: password, image:""},
        {name: "Juliano Estanormal", email: "julianoestanormal@email.com", password: password, image:""}
      ]);
    });
};
