exports.up = function(knex) {
  return knex.schema.alterTable('shops', table => {
    table.dateTime('created_at');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('shops', table => {
    table.dropColumn('created_at');
  });
};
