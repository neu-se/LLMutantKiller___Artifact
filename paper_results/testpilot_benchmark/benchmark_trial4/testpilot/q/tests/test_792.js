let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with no arguments', function(done) {
        // Create a function that returns a constant
        function getConstant() {
            return 42;
        }
        
        // Create a promise using makePromise
        let promiseFunction = q.makePromise(getConstant, function() {
            return [];
        });
        
        // Test fcall with no arguments
        promiseFunction.fcall()
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});