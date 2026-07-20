let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with no arguments', function(done) {
        // Create a function that returns a constant
        function getConstant() {
            return 42;
        }
        
        // Convert it to a promise-returning function
        let promiseConstant = q.makePromise(getConstant);
        
        // Test fapply with empty arguments array
        promiseConstant.fapply([])
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});