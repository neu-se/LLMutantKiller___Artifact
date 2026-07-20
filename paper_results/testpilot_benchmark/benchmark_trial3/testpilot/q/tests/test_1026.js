let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - called on rejected promise', function(done) {
        let finallyCalled = false;
        let rejectedReason = new Error('test error');
        
        q.reject(rejectedReason)
            .finally(function() {
                finallyCalled = true;
            })
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(reason) {
                assert.strictEqual(finallyCalled, true, 'finally callback should be called');
                assert.strictEqual(reason, rejectedReason, 'rejection reason should be preserved');
                done();
            });
    });
});