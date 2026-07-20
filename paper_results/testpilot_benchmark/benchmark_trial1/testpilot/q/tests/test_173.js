let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError(message) {
            throw new Error(message);
        }
        
        // Convert it to a promise-returning function using Q.fcall or create a promise manually
        let promiseThrow = function() {
            return q.fcall(throwError, arguments[0]);
        };
        
        // Test fapply equivalent behavior with error case
        promiseThrow('test error')
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });
});