//roll changes forwards
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
      table.increments().notNullable();
      table.string('username').notNullable().unique();
      table.string('password');
    })
};

//roll changes backwards.
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
