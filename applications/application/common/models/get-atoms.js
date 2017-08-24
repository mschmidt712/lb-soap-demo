'use strict';
const rp = require('request-promise-native');

module.exports = function(Getatoms) {
  Getatoms.get = function(cb) {
    const rpOptions = {
      method: 'GET',
      uri: 'http://localhost:3000/api/periodicTables/GetAtoms',
    };

    rp(rpOptions)
      .then(resp => {
        cb(null, JSON.parse(resp));
      })
      .catch(err => {
        cb(err);
      });
  };
};
