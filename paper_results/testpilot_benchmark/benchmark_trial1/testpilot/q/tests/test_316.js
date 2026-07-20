let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with error handling', function(done) {
        // Create a function that returns an error
        function errorFunction(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Create a promise-returning function
        const promiseFunction = q.makePromise(errorFunction);
        
        // Bind with error-triggering argument
        const boundErrorFunction = promiseFunction.nbind(null, true);
        
        // Test error handling
        boundErrorFunction()
            .then(() => {
                done(new Error('Should have thrown an error'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });

    })