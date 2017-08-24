'use strict';

module.exports = function(app) {
  const db = app.dataSources.db;
  const modelName = app.models.GetAtomicNumber;

  db.automigrate(err => {
    if (err) throw err;
    console.log('Automigration complete.');
  });
};
