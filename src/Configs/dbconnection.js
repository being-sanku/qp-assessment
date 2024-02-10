const { Client } = require("pg");
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const db = process.env.DB;

function getDbConnection() {
  const client = new Client({
    user: dbUser,
    host: dbHost,
    database: db,
    password: dbPassword,
    port: dbPort,
    ssl: true,
  });
  return client;
}

function dbConnectStatus(err) {
  if (err) throw err;
  console.log("Connected!");
}

module.exports = { getDbConnection, dbConnectStatus };
