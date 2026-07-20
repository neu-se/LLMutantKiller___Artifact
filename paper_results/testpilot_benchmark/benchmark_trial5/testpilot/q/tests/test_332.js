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
        
        // Use q.denodeify to convert the callback-based function to a promise
        const promiseFunction = q.denodeify(errorFunction);
        
        // Call the promisified function with shouldError = true
        promiseFunction(true)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});