exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.text('mapname').notNullable();
    table.json('fc_mapstate').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
