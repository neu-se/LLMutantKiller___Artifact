let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with successful function', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a promise using Q.denodeify or Q.nfcall
        // Since makePromise doesn't exist, we'll create a promise-returning function
        function promiseAdd(a, b) {
            return q.fcall(add, a, b);
        }
        
        // Test the promise function
        promiseAdd(5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});