'use strict';

module.exports = function(Getatoms) {
  Getatoms.get = function(cb) {
    Getatoms.find((err, atoms) => {
      if (err) {
        cb(err);
      }

      if (!atoms.length) {
        cb('No atoms exist in the database');
      }

      cb(null, atoms);
    });
  };

  Getatoms.put = function(atoms, cb) {
    const promises = [];
    atoms.forEach(atom => {
      promises.push(new Promise((resolve, reject) => {
        Getatoms.findOne({
          where: {
            ElementName: atom.ElementName,
          },
        }, (err, result) => {
          if (err) reject(err);
          if (!result) {
            Getatoms.create({ElementName: atom.ElementName}, (err, result) => {
              if (err) reject(err);
              resolve(result);
            });
          } else {
            resolve(result);
          }
        });
      }));
    });

    Promise.all(promises).then(results => {
      cb(null, results);
    })
    .catch(err => {
      cb(err);
    });
  };
};
