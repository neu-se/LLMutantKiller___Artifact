let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that returns value', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a promise for the function using Q.fbind
        let promisedAdd = q.fbind(add);
        
        // Test fapply with arguments array
        promisedAdd.fapply([5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});