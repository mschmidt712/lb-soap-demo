'use strict';
const rp = require('request-promise-native');

module.exports = function(Getatomicweight) {
  Getatomicweight.post = function(element, cb) {
    const rpOptions = {
      method: 'GET',
      uri: `http://localhost:3000/api/periodicTables/GetAtomicWeight?elementName=${element}`,
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
