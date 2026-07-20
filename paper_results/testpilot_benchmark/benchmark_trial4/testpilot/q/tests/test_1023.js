let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - called on rejected promise', function(done) {
        let finallyCalled = false;
        let rejectedError = new Error('test error');
        
        q.reject(rejectedError)
            .finally(function() {
                finallyCalled = true;
            })
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(finallyCalled, true, 'finally callback should be called');
                assert.strictEqual(error, rejectedError, 'rejected error should be preserved');
                done();
            });
    });
});