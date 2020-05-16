const db = require('../database');

module.exports = {
  getById: async (shopUrl) => {
    const { rows } = await db.query('SELECT FROM shops WHERE url = $1::text LIMIT 1', [shopUrl]);
    // TODO(nich): Build a Shop from the result
    return rows[0];
  },
  add: async (shopUrl) => {
    return await db.query('INSERT INTO shops(url) VALUES ($1)', [shopUrl]);
  },
  deleteByUrl: (shopUrl) => ({}),
  deleteById: (shopId) => ({}),
  saveByUrl: (shopUrl, shop) => ({}),
};