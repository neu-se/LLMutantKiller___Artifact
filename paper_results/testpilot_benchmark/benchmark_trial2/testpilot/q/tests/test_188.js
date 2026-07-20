let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with successful function', function(done) {
        // Create a simple function that adds two numbers
        function addNumbers(a, b) {
            return a + b;
        }
        
        // Convert it to a promise-returning function using q.denodeify or create a promise directly
        let promiseAdd = q.denodeify(function(a, b, callback) {
            try {
                let result = addNumbers(a, b);
                callback(null, result);
            } catch (err) {
                callback(err);
            }
        });
        
        // Test fapply with arguments array
        promiseAdd.fapply([5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});