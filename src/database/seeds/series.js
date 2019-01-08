
exports.seed = function (knex, Promise) {
  return knex('series').del()
  .then(function () {
    return knex('series').insert([
      {
        name: "Vila dos Macacos",
        photo: "202cb962ac59075b964b07152d234b10.jpg",
        score: "3",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
      {
        name: "Chapeuzinho Cor de Pele",
        photo: "202cb962ac59075b964b07152d234b89.jpg",
        score: "4",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
      {
        name: "Atentado a Santa Luzia",
        photo: "202cb962ac59075b964b07152d234b45.jpg",
        score: "5",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
      {
        name: "Se eu danço, ela só olha",
        photo: "202cb962ac59075b964b07152d234b74.jpg",
        score: "3",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
      {
        name: "Só aqui que existe Titanic",
        photo: "202cb962ac59075b964b07152d234b60.jpg",
        score: "2",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
      {
        name: "Vikings",
        photo: "202cb962ac59075b964b07152d234b89.png",
        score: "1",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
      {
        name: "Cowboy Fora da Lei",
        photo: "202cb962ac59075b964b07152d234b19.jpg",
        score: "5",
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
      },
    ]);
  });
};
