let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - successful callback', function(done) {
        // Create a mock function that simulates a Node.js-style async function
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Create a promise from the mock function
        let promisifiedFunction = q.denodeify(mockAsyncFunction);
        
        // Test nfapply with successful execution
        q.nfapply(promisifiedFunction, [5, 3])
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});