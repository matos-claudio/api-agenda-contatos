const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://root:12345@cluster0.lapw0.mongodb.net/agenda-contatos?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Conexao com o banco, OK!!!`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usuarioRoute = require('./routes/usuario/usuario-route');
usuarioRoute(app);

app.listen(port);

console.log("Servidor Node rodando na porta: " + port);
