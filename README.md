# My Series (backend)

Netflix and WhatsApp working in a certain way "together"! 

Enjoy 100% of the project, clone the frontend 
here https://github.com/LeonardoMarco/my-series-frontEnd

### Installation

My Series(backend) requires: 
[Node.js](https://nodejs.org/) v4+

[Knex.js](https://www.npmjs.com/package/knex)

```sh
$ npm install
```

Build the database according to ./src/knexfile.js and ./src/bookshelf.js!

Run migrations and seeds
```sh
$ cd ./src
$ knex migrate:latest
$ knex seed:run
```

Start the server.

```sh
$ cd ./src
$ node app
```
