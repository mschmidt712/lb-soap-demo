'use strict';
const rp = require('request-promise-native');
var parser = require('xml2json');

module.exports = function(Getatoms) {
  Getatoms.get = function(feature, cb) {
    let rpOptions;

    if (feature) {
      rpOptions = {
        method: 'GET',
        uri: 'http://localhost:3001/api/GetAtoms',
      };
    } else {
      rpOptions = {
        method: 'POST',
        uri: 'http://localhost:3000/api/periodictableSoap/GetAtoms',
        body: {},
        json: true,
      };
    }

    rp(rpOptions)
      .then(resp => {
        if (feature) {
          cb(null, JSON.parse(resp));
        } else {
          const jsonObj = parser.toJson(resp.GetAtomsResult);
          const jsonResp = JSON.parse(jsonObj).NewDataSet.Table;
          cb(null, jsonResp);
        }
      })
      .catch(err => {
        cb(err);
      });
  };
};
