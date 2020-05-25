const db = require('../database');

module.exports = {
  getById: (id) => {
    return db('properties').where({ id }).first();
  },
  add: (property, groupId) => {
    return db('properties')
      .insert({
        groupId,
        ...property,
      });
  },
  deleteById: (id) => {
    return db('properties').where({ id }).delete();
  },
  save: (id, property) => {
    // TODO(nich): Deconstruct into properties for _only_ properties which should be updated
    const propertyProperties = {};

    return db('properties')
      .where({ id })
      .update(propertyProperties, ['id']);
  },
};