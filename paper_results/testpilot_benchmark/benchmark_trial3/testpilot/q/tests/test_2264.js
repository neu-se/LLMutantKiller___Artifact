let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with successful callback', function(done) {
        // Create a mock Node.js style callback function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Result: ${arg1} + ${arg2}`);
            }, 10);
        }
        
        // Denodeify the function
        const promisifiedFunction = q.denodeify(mockAsyncFunction);
        
        // Test that it returns a promise and resolves correctly
        promisifiedFunction('hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Result: hello + world');
                done();
            })
            .catch(done);
    });
});