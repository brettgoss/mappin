//

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'labber',
    password : 'labber',
    database : 'midterm'
  }
});

module.exports = knex;
