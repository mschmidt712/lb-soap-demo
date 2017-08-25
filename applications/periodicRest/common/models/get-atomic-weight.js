'use strict';

module.exports = function(Getatomicweight) {
  Getatomicweight.post = function(element, cb) {
    Getatomicweight.findOne({
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

  Getatomicweight.put = function(element, cb) {
    Getatomicweight.findOne({
      where: {
        ElementName: element.ElementName,
      },
    }, (err, result) => {
      if (err) cb(err);
      if (result) {
        const elementWithId = Object.assign({}, element, {
          id: result['id'],
        });
        Getatomicweight.upsert(elementWithId, (err, result) => {
          if (err) cb(err);
          cb(null, result);
        });
      } else {
        Getatomicweight.create(element, (err, result) => {
          if (err) cb(err);
          cb(null, result);
        });
      }
    });
  };
};
