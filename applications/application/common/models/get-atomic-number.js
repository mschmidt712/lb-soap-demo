'use strict';
const rp = require('request-promise-native');
var parser = require('xml2json');

module.exports = function(Getatomicnumber) {
  Getatomicnumber.get = function(element, feature, cb) {

    let rpOptions;
    if (feature) {
      const filter = JSON.stringify({
        where: {
          ElementName: element,
        },
      });

      rpOptions = {
        method: 'GET',
        uri: `http://localhost:3001/api/GetAtomicNumbers?filter=${filter}`,
      };
    } else {
      rpOptions = {
        method: 'POST',
        uri: 'http://localhost:3000/api/periodictableSoap/GetAtomicNumber',
        body: {
          ElementName: element,
        },
        json: true,
      };
    }

    rp(rpOptions)
      .then(resp => {
        console.log(resp);
        if (feature) {
          cb(null, JSON.parse(resp));
        } else {
          const jsonObj = parser.toJson(resp.GetAtomicNumberResult);
          const jsonResp = JSON.parse(jsonObj).NewDataSet.Table;
          cb(null, jsonResp);
        }
      })
      .catch(err => {
        cb(err);
      });
  };
};
