const { onUpdateTrigger } = require('../knexfile')

exports.up = function (knex) {
  return knex.schema.alterTable('shops', table => {
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.raw(onUpdateTrigger('shops'));
    });

};
exports.down = function (knex) {
  return knex.schema.alterTable('shops', table => {
    table.dropTimestamps();
  });

};
