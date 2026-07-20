let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - with empty args', function(done) {
        function mockAsyncFunctionNoArgs(callback) {
            setTimeout(() => {
                callback(null, 'no args result');
            }, 10);
        }
        
        const promisified = q.denodeify(mockAsyncFunctionNoArgs);
        
        promisified.nfapply([])
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });
});