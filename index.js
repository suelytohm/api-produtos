const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/email", (req, res) => {
  res.send("Hello World!");
});

// Listagem de produtos
app.get("/produtos", (req, res) => {
  const consulta =
    "SELECT id,nomeProduto, marcaProduto, codigoBarras, quantidade, validade, DATEDIFF(validade, NOW()) AS diasValidade FROM produtos WHERE quantidade > 0 ORDER BY validade";

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      connection.query(consulta, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

// Cadastro de produtos
app.post("/produto", (req, res) => {
  const produto = req.body;
  const consulta = `INSERT INTO produtos (nomeProduto, marcaProduto, codigoBarras, quantidade, validade) VALUES ('${produto.nomeProduto}', '${produto.marcaProduto}', '${produto.codigoBarras}', ${produto.quantidade}, '${produto.validade}')`;

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      connection.query(consulta, produto, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

// Alteração de produtos
app.put("/produto/:id", (req, res) => {
  const id = req.params.id;
  const produto = req.body;
  const consulta = `UPDATE produtos SET ? WHERE id = ${id}`;

  db.query(consulta, produto, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// Listar produtos por ID
app.get("/produto/:id", (req, res) => {
  const id = req.params.id;
  const consulta =
    "SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade, DATEDIFF(validade, NOW()) AS diasValidade FROM produtos WHERE id = " +
    id +
    " order by validade";

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(consulta, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

app.get("/produtos/buscar/:nome", (req, res) => {
  const nome = req.params.nome;
  const consulta =
    "SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade, DATEDIFF(validade, NOW()) AS diasValidade FROM produtos WHERE nomeProduto like '%" +
    nome +
    "%' or marcaProduto like '%" +
    nome +
    "%' or codigoBarras like '%" +
    nome +
    "%' " +
    " order by validade";

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(consulta, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

// Listar produtos por cód. barras
app.get("/produto/codbarras/:codigoBarras", (req, res) => {
  const codigoBarras = req.params.codigoBarras;
  const consulta =
    "SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade, DATEDIFF(validade, NOW()) AS diasValidade FROM produtos WHERE codigoBarras = " +
    codigoBarras;

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      connection.query(consulta, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

// Listar produtos por validade
app.get("/produtos/validade/:dias", (req, res) => {
  const dias = req.params.dias;
  const consulta = `SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade, DATEDIFF(validade, NOW()) AS diasValidade FROM produtos WHERE quantidade > 0 and validade <= CURDATE() + ${dias} order by validade`;

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      connection.query(consulta, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

app.get("/produtos/marca/:marca", (req, res) => {
  const marca = req.params.marca;
  const consulta =
    "SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade, DATEDIFF(validade, NOW()) AS diasValidade FROM produtos WHERE marcaProduto = '" +
    marca +
    "' order by validade";

  db.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      connection.query(consulta, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

app.get("/", (req, res) => {
  const data = new Date();

  const dia = data.getDate();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  const saudacao =
    "Olá, hoje é dia: " +
    dia +
    "/" +
    mes +
    "/" +
    ano +
    " - Hora: " +
    data.getHours() +
    ":" +
    data.getMinutes() +
    ":" +
    data.getSeconds();

  res.status(200).send(saudacao);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});

// Renomear Produtos para Validades Próximas
// Botão para zerar a quantidade = Zera / Salva e vlota para a tela ant
