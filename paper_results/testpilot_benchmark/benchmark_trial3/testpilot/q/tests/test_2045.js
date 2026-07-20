let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback throws error', function(done) {
        let finallyError = new Error('finally error');
        
        let promise = q.resolve('original value');
        
        promise.finally(function() {
            throw finallyError;
        }).then(function() {
            done(new Error('Promise should have been rejected due to finally callback error'));
        }).catch(function(error) {
            assert.strictEqual(error, finallyError, 'finally callback error should be propagated');
            done();
        });
    });
});