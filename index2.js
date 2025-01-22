require('dotenv').config();
const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Configuração do Pool do PostgreSQL
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432, // Porta padrão do PostgreSQL
  ssl: true
});

// Teste de conexão
pool.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao PostgreSQL:", err);
  } else {
    console.log("Conectado ao PostgreSQL!");
  }
});

// Endpoints
app.get("/email", (req, res) => {
  res.send("Hello World!");
});

// Listagem de produtos
app.get("/produtos", async (req, res) => {
  const consulta =
    `SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade,
       (validade - CURRENT_DATE) AS diasValidade 
       FROM produtos WHERE quantidade > 0 ORDER BY validade;`;
  try {
    const result = await pool.query(consulta);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Cadastro de produtos
app.post("/produto", async (req, res) => {
  const { nomeProduto, marcaProduto, codigoBarras, quantidade, validade } =
    req.body;
  const consulta = `
    INSERT INTO produtos (nomeProduto, marcaProduto, codigoBarras, quantidade, validade)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  try {
    const result = await pool.query(consulta, [
      nomeProduto,
      marcaProduto,
      codigoBarras,
      quantidade,
      validade,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Alteração de produtos
app.put("/produto/:id", async (req, res) => {
  const id = req.params.id;
  const { nomeProduto, marcaProduto, codigoBarras, quantidade, validade } =
    req.body;
  const consulta = `
    UPDATE produtos
    SET nomeProduto = $1, marcaProduto = $2, codigoBarras = $3, quantidade = $4, validade = $5
    WHERE id = $6 RETURNING *`;

  try {
    const result = await pool.query(consulta, [
      nomeProduto,
      marcaProduto,
      codigoBarras,
      quantidade,
      validade,
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Listar produtos por ID
app.get("/produto/:id", async (req, res) => {
  const id = req.params.id;
  const consulta = `
    SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade,
    (validade - CURRENT_DATE) AS diasValidade 
    FROM produtos WHERE id = $1`;

  try {
    const result = await pool.query(consulta, [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Buscar produtos por nome ou marca
app.get("/produtos/buscar/:nome", async (req, res) => {
  const nome = req.params.nome;
  const consulta = `
    SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade,
    (validade - CURRENT_DATE) AS diasValidade 
    FROM produtos
    WHERE nomeProduto ILIKE $1 OR marcaProduto ILIKE $1 OR codigoBarras ILIKE $1
    ORDER BY validade`;

  try {
    const result = await pool.query(consulta, [`%${nome}%`]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Listar produtos por validade
app.get("/produtos/validade/:dias", async (req, res) => {
  const dias = req.params.dias;
  const consulta = `
    SELECT id, nomeProduto, marcaProduto, codigoBarras, quantidade, validade,
    (validade - CURRENT_DATE) AS diasValidade 
    FROM produtos WHERE quantidade > 0 AND validade <= CURRENT_DATE + INTERVAL '1 day' * $1
    ORDER BY validade`;

  try {
    const result = await pool.query(consulta, [dias]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Rota principal
app.get("/", (req, res) => {
  const data = new Date();
  const saudacao = `Olá, hoje é ${data.toLocaleDateString()} - Hora: ${data.toLocaleTimeString()}`;
  res.status(200).send(saudacao);
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log("Servidor ouvindo na porta 3000");
});
