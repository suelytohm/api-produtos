require("dotenv").config();

const mysql = require("mysql");
const connection = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  connectionLimit: 10, // Número máximo de conexões permitidas
  connectTimeout: 10000, // Tempo máximo de espera para conectar (ms)
  acquireTimeout: 10000, // Tempo máximo para adquirir uma conexão (ms)
  timeout: 30000, // Tempo máximo de espera para uma consulta (ms)
});
// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "nosso",
// });

module.exports = connection;
