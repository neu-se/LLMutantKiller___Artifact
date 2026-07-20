let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - with multiple return values', function(done) {
        function mockAsyncFunctionMultipleValues(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisified = q.denodeify(mockAsyncFunctionMultipleValues);
        
        promisified.nfapply([])
            .then(result => {
                // Q typically returns only the first result value
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});