let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with no arguments', function(done) {
        // Create a mock function that takes no arguments except callback
        function mockAsyncFunction(callback) {
            setTimeout(() => {
                callback(null, 'no args result');
            }, 10);
        }
        
        // Test nfapply with empty arguments array
        q.nfapply(mockAsyncFunction, [])
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });
    
})