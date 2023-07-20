// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas da API

const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {
  res.json({ message: "Oi Express!" });
});

// entregar uma porta
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@apicluster.tg0liil.mongodb.net/`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => console.log(err));
