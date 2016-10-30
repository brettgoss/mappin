
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'ailandbeans', password:'safepassword123' }),
        knex('users').insert({id: 2, username: 'brettschool', password: 'hellasecure00'}),
        knex('users').insert({id: 3, username: 'ceyonce', password: 'gangplank55'})
      ]);
    });
};
