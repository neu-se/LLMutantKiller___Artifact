let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with successful callback', function(done) {
        // Mock function that follows Node.js callback convention (error, result)
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Result: ${arg1} + ${arg2}`);
            }, 10);
        }

        q.nfcall(mockAsyncFunction, 'hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Result: hello + world');
                done();
            })
            .catch(done);
    });
});