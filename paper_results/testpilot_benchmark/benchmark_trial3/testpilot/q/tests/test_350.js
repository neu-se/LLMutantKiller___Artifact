let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with multiple return values', function(done) {
        // Create a mock function that returns multiple values
        function mockAsyncFunction(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisified = q.makePromise(mockAsyncFunction);
        
        promisified()
            .then(result => {
                // When multiple values are returned, only the first is typically used
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});