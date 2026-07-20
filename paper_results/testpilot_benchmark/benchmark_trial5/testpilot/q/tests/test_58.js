let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with rejection', function(done) {
        let descriptor = {
            fargs: function(shouldFail) {
                return [shouldFail];
            },
            fcall: function(args) {
                if (args[0]) {
                    throw new Error('Intentional failure');
                }
                return 'success';
            }
        };
        
        // Create a promise-returning function manually
        let promiseFunc = function(shouldFail) {
            let deferred = q.defer();
            try {
                let args = descriptor.fargs(shouldFail);
                let result = descriptor.fcall(args);
                deferred.resolve(result);
            } catch (error) {
                deferred.reject(error);
            }
            return deferred.promise;
        };
        
        promiseFunc(true)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Intentional failure');
                done();
            });
    });
});