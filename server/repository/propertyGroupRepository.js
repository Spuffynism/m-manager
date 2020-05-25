const db = require('../database');

module.exports = {
  getById: (id) => {
    return db('property_groups').where({ id }).first();
  },
  add: (group, shopId) => {
    return db('property_groups')
      .insert({
        shopId,
        ...group,
      });
  },
  deleteById: (id) => {
    return db('property_groups').where({ id }).delete();
  },
  save: (id, group) => {
    // TODO(nich): Deconstruct into properties for _only_ properties which should be updated
    const groupProperties = {};
    return db('property_groups')
      .where({ id })
      .update(groupProperties, ['id', 'name']);
  },
};