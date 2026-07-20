let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with no arguments', function(done) {
        // Create a mock Node.js-style async function with no args
        function mockAsyncNoArgs(callback) {
            setTimeout(() => {
                callback(null, 'no args result');
            }, 10);
        }
        
        // Test nfcall with no arguments
        q.nfcall(mockAsyncNoArgs)
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });
});