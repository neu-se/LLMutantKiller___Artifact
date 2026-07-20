let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with function that throws error', function(done) {
        // Create a function that follows Node.js callback pattern
        function throwError(message, callback) {
            // Simulate async error by calling callback with error
            setImmediate(function() {
                callback(new Error(message));
            });
        }
        
        // Create a promise using makePromise
        let promiseFunction = q.makePromise(throwError, function(message) {
            return [message];
        });
        
        // Test fcall with error handling
        promiseFunction.fcall('test error')
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });
});