let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with successful function', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a Node.js style callback function
        function addWithCallback(a, b, callback) {
            try {
                let result = add(a, b);
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        }
        
        // Create a promise using makePromise
        let promisifiedAdd = q.makePromise(addWithCallback);
        
        // Test the promisified function
        promisifiedAdd(5, 3)
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});