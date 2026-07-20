let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall with multiple return values', function(done) {
        // Create a mock function that returns multiple values
        function mockAsyncFunctionMultipleValues(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisifiedFn = q.makePromise(mockAsyncFunctionMultipleValues);
        
        promisifiedFn.nfcall()
            .then(result => {
                // Q typically returns only the first value after error
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});