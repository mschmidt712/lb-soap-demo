'use strict';
const rp = require('request-promise-native');
var parser = require('xml2json');

module.exports = function(Periodictable) {
  Periodictable.getAtomicNumber = function(elementName, cb) {
    const optionsGetData = {
      method: 'POST',
      uri: 'http://localhost:3001/api/GetAtomicNumbers',
      body: elementName,
      json: true,
    };
    let optionsPutData = {
      method: 'PUT',
      uri: 'http://localhost:3001/api/GetAtomicNumbers',
      json: true,
    };

    rp(optionsGetData)
      .then(parsedBody => {
        const result = Object.assign({}, parsedBody, {
          fromCache: true,
        });
        cb(null, result);
      })
      .catch(err => {
        if (err.statusCode === 500) {
          getSoapData()
          .then(resp => {
            const json = parser.toJson(resp.GetAtomicNumberResult);
            return JSON.parse(json).NewDataSet.Table;
          })
          .then(cacheDataToMongo)
          .then(parsedBody => {
            const result = Object.assign({}, parsedBody['undefined'], {
              fromCache: false,
            });
            cb(null, result);
          })
          .catch(err => {
            cb(err);
          });
        } else {
          cb(err);
        }
      });

    const getSoapData = function() {
      return new Promise((resolve, reject) => {
        Periodictable.GetAtomicNumber(
          {ElementName: elementName},
          function(err, response) {
            if (err) reject(err);
            resolve(response);
          });
      });
    };

    const cacheDataToMongo = function(elementData) {
      optionsPutData.body = elementData;

      return rp(optionsPutData);
    };
  };

  Periodictable.remoteMethod(
      'getAtomicNumber', {
        accepts: [
          {arg: 'elementName', type: 'string', required: true,
            http: {source: 'query'}},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'get', path: '/GetAtomicNumber'},
      }
  );

  Periodictable.getAtomicWeight = function(elementName, cb) {
    const optionsGetData = {
      method: 'POST',
      uri: 'http://localhost:3001/api/GetAtomicWeights',
      body: elementName,
      json: true,
    };
    let optionsPutData = {
      method: 'PUT',
      uri: 'http://localhost:3001/api/GetAtomicWeights',
      json: true,
    };

    rp(optionsGetData)
      .then(parsedBody => {
        const result = Object.assign({}, parsedBody, {
          fromCache: true,
        });
        cb(null, result);
      })
      .catch(err => {
        if (err.statusCode === 500) {
          getSoapData()
          .then(resp => {
            const json = parser.toJson(resp.GetAtomicWeightResult);
            return JSON.parse(json).NewDataSet.Table;
          })
          .then(cacheDataToMongo)
          .then(parsedBody => {
            const result = Object.assign({}, parsedBody['undefined'], {
              fromCache: false,
            });
            cb(null, result);
          })
          .catch(err => {
            cb(err);
          });
        } else {
          cb(err);
        }
      });

    const getSoapData = function() {
      return new Promise((resolve, reject) => {
        Periodictable.GetAtomicWeight(
          {ElementName: elementName},
          function(err, response) {
            if (err) reject(err);
            resolve(response);
          });
      });
    };

    const cacheDataToMongo = function(elementData) {
      optionsPutData.body = Object.assign({}, elementData, {
        ElementName: elementName,
      });

      return rp(optionsPutData);
    };
  };

  Periodictable.remoteMethod(
      'getAtomicWeight', {
        accepts: [
          {arg: 'elementName', type: 'string', required: true,
            http: {source: 'query'}},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'get', path: '/GetAtomicWeight'},
      }
  );

  Periodictable.getElementSymbol = function(elementName, cb) {
    const optionsGetData = {
      method: 'POST',
      uri: 'http://localhost:3001/api/GetElementSymbols',
      body: elementName,
      json: true,
    };
    let optionsPutData = {
      method: 'PUT',
      uri: 'http://localhost:3001/api/GetElementSymbols',
      json: true,
    };

    rp(optionsGetData)
      .then(parsedBody => {
        const result = Object.assign({}, parsedBody, {
          fromCache: true,
        });
        cb(null, result);
      })
      .catch(err => {
        if (err.statusCode === 500) {
          getSoapData()
          .then(resp => {
            const json = parser.toJson(resp.GetElementSymbolResult);
            return JSON.parse(json).NewDataSet.Table;
          })
          .then(cacheDataToMongo)
          .then(parsedBody => {
            const result = Object.assign({}, parsedBody['undefined'], {
              fromCache: false,
            });
            cb(null, result);
          })
          .catch(err => {
            cb(err);
          });
        } else {
          cb(err);
        }
      });

    const getSoapData = function() {
      return new Promise((resolve, reject) => {
        Periodictable.GetElementSymbol(
          {ElementName: elementName},
          function(err, response) {
            if (err) reject(err);
            resolve(response);
          });
      });
    };

    const cacheDataToMongo = function(elementData) {
      optionsPutData.body = Object.assign({}, elementData, {
        ElementName: elementName,
      });

      return rp(optionsPutData);
    };
  };

  Periodictable.remoteMethod(
      'getElementSymbol', {
        accepts: [
          {arg: 'elementName', type: 'string', required: true,
            http: {source: 'query'}},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'get', path: '/GetElementSymbol'},
      }
  );

  Periodictable.getAtoms = function(cb) {
    const optionsGetData = {
      method: 'GET',
      uri: 'http://localhost:3001/api/GetAtoms',
    };
    let optionsPutData = {
      method: 'PUT',
      uri: 'http://localhost:3001/api/GetAtoms',
      json: true,
    };

    const getSoapData = function() {
      return new Promise((resolve, reject) => {
        Periodictable.GetAtoms(
          function(err, response) {
            if (err) reject(err);
            resolve(response);
          });
      });
    };

    const cacheDataToMongo = function(elementData) {
      optionsPutData.body = elementData;

      return rp(optionsPutData);
    };

    rp(optionsGetData)
      .then(parsedBody => {
        const result = Object.assign({}, {
          atoms: JSON.parse(parsedBody),
          fromCache: true,
        });
        cb(null, result);
      })
      .catch(err => {
        if (err.statusCode === 500) {
          return getSoapData()
          .then(resp => {
            const json = parser.toJson(resp.GetAtomsResult);
            return JSON.parse(json).NewDataSet.Table;
          })
          .then(cacheDataToMongo)
          .then(parsedBody => {
            const result = Object.assign({}, {
              atoms: parsedBody['undefined'],
              fromCache: false,
            });
            cb(null, result);
          })
          .catch(err => {
            cb(err);
          });
        } else {
          cb(err);
        }
      });
  };

  Periodictable.remoteMethod(
      'getAtoms', {
        accepts: [],
        returns: {arg: 'result', type: 'array', root: true},
        http: {verb: 'get', path: '/GetAtoms'},
      }
  );
};
