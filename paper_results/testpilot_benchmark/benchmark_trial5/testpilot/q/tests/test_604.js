let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with successful callback', function(done) {
        // Mock function that simulates a Node.js-style async function
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        const boundFunction = q.nbind(mockAsyncFunction, null);
        
        boundFunction(5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
    
    })