let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with multiple return values', function(done) {
        // Create a mock function that returns multiple values
        function mockAsyncFunctionMultipleValues(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisifiedFunction = q.makePromise(mockAsyncFunctionMultipleValues);
        
        promisifiedFunction.nfapply([])
            .then(result => {
                // When multiple values are returned, only the first is used
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});