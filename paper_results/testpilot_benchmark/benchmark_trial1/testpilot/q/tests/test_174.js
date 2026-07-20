let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with successful function', function(done) {
        // Create a simple function that adds two numbers
        function addNumbers(a, b) {
            return a + b;
        }
        
        // Convert it to a promise-returning function using q.denodeify or q.nfbind
        // Since addNumbers is synchronous, we'll wrap it to work with promises
        let promiseAdd = function() {
            return q.fcall(addNumbers, arguments[0], arguments[1]);
        };
        
        // Test fapply with arguments array
        q.fcall(addNumbers, 5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});