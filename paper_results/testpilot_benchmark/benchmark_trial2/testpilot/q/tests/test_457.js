let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with error callback', function(done) {
        // Create a callback function that fails
        function errorCallback(shouldFail, callback) {
            setTimeout(() => {
                if (shouldFail) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Convert to promised version - q.promised expects callback to be last param
        const promisedCallback = q.promised(errorCallback);
        
        // Test error case - pass shouldFail as first argument
        promisedCallback(true)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});