let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with error callback', function(done) {
        // Create a callback function that fails
        function errorCallback(value, callback) {
            setTimeout(() => {
                if (value < 0) {
                    callback(new Error('Negative value not allowed'));
                } else {
                    callback(null, value);
                }
            }, 10);
        }
        
        // Convert to promised version
        const promisedCallback = q.promised(errorCallback);
        
        // Test error handling
        promisedCallback(-1)
            .then(() => {
                done(new Error('Should have thrown an error'));
            })
            .catch(error => {
                assert.equal(error.message, 'Negative value not allowed');
                done();
            });
    });
});