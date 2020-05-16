const db = require('../database');

module.exports = {
  getById: async (shopUrl) => {
    const { rows } = await db('shops').where({ url: shopUrl }).select();
    // TODO(nich): Build a Shop from the result
    return rows[0];
  },
  add: async (shopUrl) => {
    return await db('shops').insert({ url: shopUrl });
  },
  deleteByUrl: (shopUrl) => ({}),
  deleteById: (shopId) => ({}),
  saveByUrl: (shopUrl, shop) => ({}),
};