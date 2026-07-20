let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with successful callback', function(done) {
        // Mock a Node.js style async function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} + ${arg2}`);
            }, 10);
        }
        
        const denodeified = q.denodeify(mockAsyncFunction);
        
        denodeified('hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'result: hello + world');
                done();
            })
            .catch(done);
    });
});