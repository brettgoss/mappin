exports.up = function(knex, Promise) {
    return knex.schema.createTable('favmaps', function (table) {
      table.increments().notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('map_id').unsigned().references('id').inTable('maps');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favmaps');
};