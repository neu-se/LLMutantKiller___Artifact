let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with multiple arguments', function(done) {
        // Create a mock Node.js-style async function with multiple args
        function mockAsyncMultiArgs(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, [a, b, c, d].join('-'));
            }, 10);
        }
        
        let promise = q.nfcall(mockAsyncMultiArgs, "arg1", "arg2", "arg3", "arg4");
        
        promise
            .then(result => {
                assert.equal(result, "arg1-arg2-arg3-arg4");
                done();
            })
            .catch(done);
    });
});