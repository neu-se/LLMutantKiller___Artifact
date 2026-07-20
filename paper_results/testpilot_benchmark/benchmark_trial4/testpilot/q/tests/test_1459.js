let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - should not affect promise resolution', function(done) {
        q.stopUnhandledRejectionTracking();
        
        let resolvedPromise = q.resolve('test value');
        let rejectedPromise = q.reject(new Error('test error'));
        
        resolvedPromise.then((value) => {
            assert.strictEqual(value, 'test value');
            
            rejectedPromise.catch((error) => {
                assert.strictEqual(error.message, 'test error');
                done();
            });
        }).catch(done);
    });
});