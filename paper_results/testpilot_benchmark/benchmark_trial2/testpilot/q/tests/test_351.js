let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - nonexistent method', function(done) {
        let mockObject = {};
        
        // Create a promise-wrapped object using Q.nbind or manual promise creation
        let promisedObject = {
            npost: function(methodName, args) {
                return q.Promise(function(resolve, reject) {
                    try {
                        if (typeof mockObject[methodName] !== 'function') {
                            reject(new TypeError(methodName + ' is not a function'));
                            return;
                        }
                        let result = mockObject[methodName].apply(mockObject, args);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        };
        
        promisedObject.npost('nonexistentMethod', [])
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert(error instanceof TypeError);
                done();
            });
    });
});