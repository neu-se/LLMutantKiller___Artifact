let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with successful callback', function(done) {
        // Mock Node-style function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }

        q.nfapply(mockAsyncFunction, [5, 3])
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});