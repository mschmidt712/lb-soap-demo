'use strict';

module.exports = function(Getatomicnumber) {
  Getatomicnumber.post = function(element, cb) {
    Getatomicnumber.findOne({
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

  Getatomicnumber.put = function(element, cb) {
    Getatomicnumber.findOne({
      where: {
        ElementName: element.name,
      },
    }, (err, result) => {
      if (err) cb(err);
      if (result) {
        const elementWithId = Object.assign({}, element, {
          id: result['id'],
        });
        Getatomicnumber.upsert(elementWithId, (err, result) => {
          if (err) cb(err);
          cb(null, result);
        });
      } else {
        Getatomicnumber.create(element, (err, result) => {
          if (err) cb(err);
          cb(null, result);
        });
      }
    });
  };
};
