const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
  },
});

module.exports = db;