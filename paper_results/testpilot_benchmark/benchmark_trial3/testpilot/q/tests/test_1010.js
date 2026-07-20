let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should preserve rejection reason even if finally callback returns a value', function(done) {
            let originalError = new Error('original error');
            
            q.reject(originalError)
                .finally(function() {
                    return 'some value';
                })
                .then(function() {
                    done(new Error('Promise should have been rejected'));
                }, function(reason) {
                    assert.strictEqual(reason, originalError, 'Original rejection reason should be preserved');
                    done();
                })
                .catch(done);
        });

            })
})