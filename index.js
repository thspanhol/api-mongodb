// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const Person = require("./models/Person");

// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas da API
app.post('/person', async (req, res) => {
  // req.body
  const {name, salary, approved} = req.body

  const person = {
    name,
    salary,
    approved
  }

  try {
    await Person.create(person)

    res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})

  } catch (error) {
    res.status(500).json({error: error})
  }

})

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
