let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with successful callback', function(done) {
        // Mock Node.js style callback function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} + ${arg2}`);
            }, 10);
        }

        q.nfcall(mockAsyncFunction, 'hello', 'world')
            .then(function(result) {
                assert.strictEqual(result, 'result: hello + world');
                done();
            })
            .catch(done);
    });
});