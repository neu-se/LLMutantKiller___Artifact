let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with simple callback', function(done) {
        // Create a simple node-style callback function
        function nodeStyleFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Use q.nbind to create a promise-returning function with bound arguments
        const boundFunction = q.nbind(nodeStyleFunction, null, 5, 3);
        
        // Test the bound function
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});