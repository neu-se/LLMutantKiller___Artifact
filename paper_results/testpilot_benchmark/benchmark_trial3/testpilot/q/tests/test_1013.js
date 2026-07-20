let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should reject if finally callback throws an error', function(done) {
            let finallyError = new Error('finally error');
            
            q.resolve('success')
                .finally(function() {
                    throw finallyError;
                })
                .then(function() {
                    done(new Error('Promise should have been rejected'));
                }, function(reason) {
                    assert.strictEqual(reason, finallyError, 'Should reject with finally callback error');
                    done();
                })
                .catch(done);
        });

            })
})