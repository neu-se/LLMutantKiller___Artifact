let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError(message) {
            throw new Error(message);
        }
        
        // Convert it to a promise-returning function using denodeify
        let promiseThrow = q.denodeify(throwError);
        
        // Test with error case
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