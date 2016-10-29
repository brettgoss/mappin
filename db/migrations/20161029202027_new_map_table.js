exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
      // table.increments().notNullable();
      // table.text('fc_mapstate').notNullable();
      // table.text('mapname');
      // table.integer('user_id').unsigned().references('id').inTable('users');
    })
};

//roll changes backwards.
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
