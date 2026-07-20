let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with successful function', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Use q.fcall directly to call the function with arguments
        q.fcall(add, 5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});