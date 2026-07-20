let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback returns rejected promise', function(done) {
        let finallyError = new Error('finally rejection');
        
        let promise = q.resolve('original value');
        
        promise.finally(function() {
            return q.reject(finallyError);
        }).catch(function(error) {
            assert.strictEqual(error, finallyError, 'finally callback rejection should be propagated');
            done();
        }).catch(done);
    });
});