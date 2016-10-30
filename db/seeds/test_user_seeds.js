
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'ailandbeans', password:'safepassword123' }),
        knex('users').insert({username: 'brettschool', password: 'hellasecure00'}),
        knex('users').insert({username: 'ceyonce', password: 'gangplank55'})
      ]);
    });
};
