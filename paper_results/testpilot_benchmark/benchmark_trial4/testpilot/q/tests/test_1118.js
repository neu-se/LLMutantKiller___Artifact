let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - error case', function(done) {
        // Create a mock function that calls callback with error
        function mockAsyncFunctionWithError(arg1, callback) {
            setTimeout(() => {
                callback(new Error(`Error with ${arg1}`));
            }, 10);
        }
        
        const promisified = q.denodeify(mockAsyncFunctionWithError);
        
        promisified.nfapply(['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Error with test');
                done();
            });
    });
});