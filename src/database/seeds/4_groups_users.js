exports.seed = function(knex, Promise) {
    return knex('groups_users').del()
      .then(function () {
        return knex('groups_users').insert([
          {group_id: 1, user_id: 1, role_id: 'admin', star: false},
          {group_id: 2, user_id: 1, role_id: 'member', star: false},
          {group_id: 3, user_id: 1, role_id: 'member', star: false},
          {group_id: 4, user_id: 2, role_id: 'admin', star: false},
          {group_id: 5, user_id: 2, role_id: 'member', star: false}
        ]);
      });
  };
  