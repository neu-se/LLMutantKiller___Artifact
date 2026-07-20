let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should reject with custom error message when provided as string', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise.timeout(50, 'Custom timeout message');
            
            promise.then(function(value) {
                done(new Error('Promise should have timed out'));
            }).catch(function(error) {
                assert(error instanceof Error);
                assert.equal(error.code, 'ETIMEDOUT');
                assert.equal(error.message, 'Custom timeout message');
                done();
            });
        });
        
    });
});