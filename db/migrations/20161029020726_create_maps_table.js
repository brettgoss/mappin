exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
      table.increments().notNullable();
      table.text('fc_mapstate').notNullable();
      table.text('mapname');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users');
    })
};

//roll changes backwards.
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
