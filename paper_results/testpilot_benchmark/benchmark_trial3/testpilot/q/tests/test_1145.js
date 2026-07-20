let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with no arguments', function(done) {
        // Create a mock Node.js-style async function with no args
        function mockAsyncNoArgs(callback) {
            setTimeout(() => {
                callback(null, "no args result");
            }, 10);
        }
        
        let promise = q.nfcall(mockAsyncNoArgs);
        
        promise
            .then(result => {
                assert.equal(result, "no args result");
                done();
            })
            .catch(done);
    });
});