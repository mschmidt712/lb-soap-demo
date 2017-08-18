
module.exports = function(soap_periodictableSoap) {

/**
 * GetAtoms
 * @param {GetAtoms} GetAtoms GetAtoms
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {GetAtomsResponse} result Result object
 */
soap_periodictableSoap.soapPeriodictableSoapGetAtoms = function(GetAtoms, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}


/**
 * GetAtomicWeight
 * @param {GetAtomicWeight} GetAtomicWeight GetAtomicWeight
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {GetAtomicWeightResponse} result Result object
 */
soap_periodictableSoap.soapPeriodictableSoapGetAtomicWeight = function(GetAtomicWeight, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}


/**
 * GetAtomicNumber
 * @param {GetAtomicNumber} GetAtomicNumber GetAtomicNumber
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {GetAtomicNumberResponse} result Result object
 */
soap_periodictableSoap.soapPeriodictableSoapGetAtomicNumber = function(GetAtomicNumber, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}


/**
 * GetElementSymbol
 * @param {GetElementSymbol} GetElementSymbol GetElementSymbol
 * @callback {Function} callback Callback function
 * @param {Error|string} err Error object
 * @param {GetElementSymbolResponse} result Result object
 */
soap_periodictableSoap.soapPeriodictableSoapGetElementSymbol = function(GetElementSymbol, callback) {

  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  process.nextTick(function() {
    var err = new Error('Not implemented');
    callback(err);
  });
  
}




soap_periodictableSoap.remoteMethod('soapPeriodictableSoapGetAtoms',
  { isStatic: true,
  accepts: 
   [ { arg: 'GetAtoms',
       type: 'GetAtoms',
       description: 'GetAtoms',
       required: true,
       http: { source: 'body' } } ],
  returns: 
   [ { description: 'Request was successful',
       type: 'GetAtomsResponse',
       arg: 'data',
       root: true } ],
  http: { verb: 'post', path: '/periodictableSoap/GetAtoms' },
  description: undefined }
);

soap_periodictableSoap.remoteMethod('soapPeriodictableSoapGetAtomicWeight',
  { isStatic: true,
  accepts: 
   [ { arg: 'GetAtomicWeight',
       type: 'GetAtomicWeight',
       description: 'GetAtomicWeight',
       required: true,
       http: { source: 'body' } } ],
  returns: 
   [ { description: 'Request was successful',
       type: 'GetAtomicWeightResponse',
       arg: 'data',
       root: true } ],
  http: { verb: 'post', path: '/periodictableSoap/GetAtomicWeight' },
  description: undefined }
);

soap_periodictableSoap.remoteMethod('soapPeriodictableSoapGetAtomicNumber',
  { isStatic: true,
  accepts: 
   [ { arg: 'GetAtomicNumber',
       type: 'GetAtomicNumber',
       description: 'GetAtomicNumber',
       required: true,
       http: { source: 'body' } } ],
  returns: 
   [ { description: 'Request was successful',
       type: 'GetAtomicNumberResponse',
       arg: 'data',
       root: true } ],
  http: { verb: 'post', path: '/periodictableSoap/GetAtomicNumber' },
  description: undefined }
);

soap_periodictableSoap.remoteMethod('soapPeriodictableSoapGetElementSymbol',
  { isStatic: true,
  accepts: 
   [ { arg: 'GetElementSymbol',
       type: 'GetElementSymbol',
       description: 'GetElementSymbol',
       required: true,
       http: { source: 'body' } } ],
  returns: 
   [ { description: 'Request was successful',
       type: 'GetElementSymbolResponse',
       arg: 'data',
       root: true } ],
  http: { verb: 'post', path: '/periodictableSoap/GetElementSymbol' },
  description: undefined }
);

}
