
exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        knex('maps').insert({id: 1, mapname: 'aileensart', fc_mapstate: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.70277166366579,48.454253488379855]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.64955663681032,48.47679056360733]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.70448827743532,48.38612620515928]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.55067968368532,48.48316287042835]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.79237890243532,48.387950197561274]}}],"bbox":[[-123.85951995849611,48.3548801894373,-123.58863830566408,48.48703138045648]]}}),
        knex('maps').insert({id: 2, mapname: 'brettsburgers', fc_mapstate: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"red"},"geometry":{"type":"Point","coordinates":[-123.391050696373,48.49271982976634]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.3742278814316,48.47121413847797]}}],"bbox":[[-123.42950820922853,48.435920509197814,-123.29372406005861,48.507165622226005]]}}),
        knex('maps').insert({id: 3, mapname: 'ceciascandy', fc_mapstate: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.37061762809755,48.47701815977784]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.33903193473817,48.438312142641244]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.34315180778505,48.45857956168727]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-123.40014338493349,48.4608562943115]}}],"bbox":[[-123.50074768066408,48.40299564059214,-123.22917938232423,48.510918579522865]]}})
      ]);
    });
};

