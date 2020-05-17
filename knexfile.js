require('dotenv').config({
  path: `.${process.env.NODE_ENV === 'production' ? '' : process.env.NODE_ENV}.env`,
});

const {
  DB_USER,
  DB_DATABASE,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: DB_DATABASE,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: DB_DATABASE,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/config.sqlite3',
    },
  },
  onUpdateTrigger: table => (
    `CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();`
  ),
};
