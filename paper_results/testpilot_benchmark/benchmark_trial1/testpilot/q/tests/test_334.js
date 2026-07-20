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
        
        // Use q.nbind to create a promise-returning function
        const promiseFunction = q.nbind(errorFunction, null);
        
        // Test error handling by calling with error-triggering argument
        promiseFunction(true)
            .then(() => {
                done(new Error('Should have thrown an error'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});