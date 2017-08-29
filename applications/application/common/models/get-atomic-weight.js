'use strict';
const rp = require('request-promise-native');
var parser = require('xml2json');

module.exports = function(Getatomicweight) {
  Getatomicweight.get = function(element, feature, cb) {
    let rpOptions;
    if (feature) {
      const filter = JSON.stringify({
        where: {
          ElementName: element,
        },
      });

      rpOptions = {
        method: 'GET',
        uri: `http://localhost:3001/api/GetAtomicWeights?filter=${filter}`,
      };
    } else {
      rpOptions = {
        method: 'POST',
        uri: 'http://localhost:3000/api/periodictableSoap/GetAtomicWeight',
        body: {
          ElementName: element,
        },
        json: true,
      };
    }

    rp(rpOptions)
      .then(resp => {
        let jsonResp;
        if (feature) {
          jsonResp = JSON.parse(resp);
          cb(null, jsonResp[0]);
        } else {
          const jsonObj = parser.toJson(resp.GetAtomicWeightResult);
          jsonResp = JSON.parse(jsonObj).NewDataSet.Table;
          const returnResp = Object.assign({}, jsonResp, {
            ElementName: element,
          });
          cb(null, returnResp);
        }
      })
      .catch(err => {
        cb(err);
      });
  };
};
