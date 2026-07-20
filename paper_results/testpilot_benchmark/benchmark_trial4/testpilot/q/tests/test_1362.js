let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject - should work with undefined rejection reason', function(done) {
        let resolvedPromise = q.resolve('test');
        
        q.thenReject(resolvedPromise, undefined)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, undefined);
                done();
            });
    });
});