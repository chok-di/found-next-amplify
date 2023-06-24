const { Client } = require("pg");

async function connectToDatabase() {
  const client = new Client({
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
  });
  return client;

}

module.exports = { connectToDatabase };

