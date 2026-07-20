let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with successful function', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a promise-returning function using makePromise
        // makePromise expects a function that takes arguments + callback
        let promiseFunction = q.makePromise(function(a, b, callback) {
            try {
                let result = add(a, b);
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        });
        
        // Test fcall with arguments
        promiseFunction.fcall(5, 3)
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});