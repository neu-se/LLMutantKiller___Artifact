let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with no return value', function(done) {
        // Create a mock function that calls callback with no data
        function mockAsyncFunction(callback) {
            setTimeout(() => {
                callback(null);
            }, 10);
        }
        
        const promisified = q.makePromise(mockAsyncFunction);
        
        promisified()
            .then(result => {
                assert.strictEqual(result, undefined);
                done();
            })
            .catch(done);
    });
});