let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with error callback', function(done) {
        // Create a callback function that returns an error
        function errorCallback(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Convert to promise using q.promised
        const promisedFunction = q.promised(errorCallback);
        
        // Test error handling
        promisedFunction(true)
            .then(() => {
                done(new Error('Should have thrown an error'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });
    
    })