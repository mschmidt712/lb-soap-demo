'use strict';

module.exports = function(Getelementsymbol) {
  Getelementsymbol.post = function(element, cb) {
    Getelementsymbol.findOne({
      where: {
        ElementName: element,
      },
    }, (err, ele) => {
      if (err) {
        cb(err);
      }

      if (!ele) {
        cb('Element does not exist in the database');
      }

      cb(null, ele);
    });
  };

  Getelementsymbol.put = function(element, cb) {
    Getelementsymbol.findOne({
      where: {
        ElementName: element.ElementName,
      },
    }, (err, result) => {
      if (err) cb(err);
      if (result) {
        const elementWithId = Object.assign({}, element, {
          id: result['id'],
        });
        Getelementsymbol.upsert(elementWithId, (err, result) => {
          if (err) cb(err);
          cb(null, result);
        });
      } else {
        Getelementsymbol.create(element, (err, result) => {
          if (err) cb(err);
          cb(null, result);
        });
      }
    });
  };
};
