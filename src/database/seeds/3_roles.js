exports.seed = function(knex, Promise) {
    return knex('roles').del()
    .then(function() {
        return knex('roles').insert([
            {id: "admin", name: "Administrador"},
            {id: "member", name: "Membro"}
        ]);
    })
}