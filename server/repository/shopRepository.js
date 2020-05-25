const db = require('../database');

module.exports = {
  getByUrl: (shopUrl) => {
    return db('shops').where({ url: shopUrl }).first('id', 'url');
  },
  add: (shopUrl) => {
    return db('shops')
      .returning(['id', 'url'])
      .insert({ url: shopUrl });
  },
  deleteByUrl: (shopUrl) => {
    return db('shops').where({ url: shopUrl }).delete();
  },
  deleteById: (shopId) => {
    return db('shops').where({ id: shopId }).delete();
  },
  saveByUrl: (shopUrl, shop) => {
    // TODO(nich): Deconstruct into properties for _only_ properties which should be updated
    const properties = {};

    return db('shops').where({ url: shopUrl }).update(properties, ['id', 'url']);
  },
};