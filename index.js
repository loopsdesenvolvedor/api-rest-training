const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Array que simula um banco de dados.
var dataBase = {
  products: [
    { id: 1, product: "Celular", launch: 2020, price: 2.999 },
    { id: 2, product: "Mini System", launch: 2020, price: 1.499 },
    { id: 3, product: "WebCan", launch: 2014, price: 39.99 },
    { id: 4, product: "Computador", launch: 2020, price: 999 },
    { id: 5, product: "Panela Elétrica", launch: 2018, price: 414.99 },
    { id: 6, product: "Cafeteira", launch: 2020, price: 104.59 },
  ],
};

//iniciando o body-parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//esta rota devolve a lista completa.
app.get("/products", (req, res) => {
  res.statusCode = 200;
  res.json(dataBase.products);
});

//esta rota devolve um produto pelo id.
app.get("/products/:id", (req, res) => {
  //validando a rota.
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var product = dataBase.products.find((item) => item.id === id);

    if (product != undefined) {
      res.sendStatus = 200;
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  }
});

//esta rota cria um novo produto.
app.post("/product", (req, res) => {
  var { product, price, launch } = req.body;

  //validando e garantido que nem um campo seja esquecido.
  if (product != undefined && price != undefined && launch != undefined) {
    dataBase.products.push({
      product,
      price,
      launch,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
//esta rota deleta um produto.
app.delete("/product/:id", (req, res) => {
  //validando.
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    var index = dataBase.products.findIndex((g) => g.id === id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      dataBase.products.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.put("/product/:id", (req, res) => {
  //validano.
  if (isNaN(req.params.id)) {
    res.sendStatus(404);
  } else {
    var id = parseInt(req.params.id);

    var index = dataBase.products.find((item) => item.id == id);
    if (index != undefined) {
      var { product, price, launch } = req.body;
      if (product != undefined) {
        index.product = product;
      }
      if (price != undefined) {
        index.price = price;
      }
      if (index != undefined) {
        index.launch = launch;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});
//Servidor
app.listen(3000, () => console.log("servidor ok"));
