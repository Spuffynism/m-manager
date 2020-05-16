exports.up = function (knex) {
  return knex.schema
    .createTable('shops', table => {
      table.increments('id');
      table.string('url').unique();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('shops');
};
