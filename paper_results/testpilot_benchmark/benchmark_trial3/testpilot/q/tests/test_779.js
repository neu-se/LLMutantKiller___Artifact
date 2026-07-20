let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with successful function', function(done) {
        // Create a simple function that adds two numbers
        function addNumbers(a, b) {
            return a + b;
        }
        
        // Create a promise and use fapply to call the function with arguments
        let promise = q.resolve(addNumbers);
        
        // Test fapply with arguments array
        promise.fapply([5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});