let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with successful callback', function(done) {
        // Create a mock function that calls callback with success
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        const promisified = q.makePromise(mockAsyncFunction);
        
        promisified(5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});