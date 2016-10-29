exports.up = function(knex, Promise) {
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('username');
    })
  return Promise.all([
  ])
};

//roll changes backwards.
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};