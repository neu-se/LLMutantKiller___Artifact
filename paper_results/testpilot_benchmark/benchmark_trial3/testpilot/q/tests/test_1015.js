let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should reject if finally callback returns a rejected promise', function(done) {
            let finallyError = new Error('finally promise error');
            
            q.resolve('success')
                .finally(function() {
                    return q.reject(finallyError);
                })
                .then(function() {
                    done(new Error('Promise should have been rejected'));
                }, function(reason) {
                    assert.strictEqual(reason, finallyError, 'Should reject with finally promise error');
                    done();
                })
                .catch(done);
        });
    });
});