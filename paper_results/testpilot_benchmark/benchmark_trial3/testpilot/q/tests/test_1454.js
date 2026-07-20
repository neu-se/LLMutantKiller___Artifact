let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - should not affect promise resolution', function(done) {
        q.stopUnhandledRejectionTracking();
        
        let promise = q.resolve('test value');
        promise.then((value) => {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
    });
});