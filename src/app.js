/*
*   framework para nodejs, que ajuda a fazer tratativa de rotas e requests http
*/
const express = require("express");
const cors = require("cors");
/*
*   ajuda o node entender as requisições recebendo info em json e que tb possa entender os parametros get passados pela url
*/
const bodyParser = require("body-parser");
/*
*   cria a aplicação
*/
const app = express();
app.use(cors());
/*
*   entender quando estou enviando requisições em json
*/
app.use(bodyParser.json());
/*
*   decodificar os paramentros que passo pela url
*/
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/userController")(app);

app.listen(3000, () => {
    console.log("marcelo")
});