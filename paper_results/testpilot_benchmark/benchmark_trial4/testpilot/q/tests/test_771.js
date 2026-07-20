let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promise with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError(message) {
            throw new Error(message);
        }
        
        // Create a promise that calls the function
        let promise = q.fcall(throwError, 'test error');
        
        // Test promise with error case
        promise
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });
});