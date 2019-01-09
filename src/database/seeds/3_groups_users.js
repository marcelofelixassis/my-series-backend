exports.seed = function(knex, Promise) {
    return knex('groups_users').del()
      .then(function () {
        return knex('groups_users').insert([
          {fk_groups: 1, fk_users: 1},
          {fk_groups: 2, fk_users: 1},
          {fk_groups: 3, fk_users: 1},
          {fk_groups: 4, fk_users: 2},
          {fk_groups: 5, fk_users: 2}
        ]);
      });
  };
  