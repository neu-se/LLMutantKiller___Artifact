let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with rejected promise', function(done) {
        let finallyCallbackCalled = false;
        let rejectionReason = new Error('test error');
        
        q.finally(q.reject(rejectionReason), function() {
            finallyCallbackCalled = true;
        }).then(function() {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error, rejectionReason);
            assert.strictEqual(finallyCallbackCalled, true);
            done();
        });
    });
});