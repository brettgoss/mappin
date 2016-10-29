exports.up = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
      table.string('password');
    })
};

//roll changes backwards.
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};