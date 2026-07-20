let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should reject with timeout error when promise takes too long', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise.timeout(50);
            
            // Never resolve the promise, let it timeout
            
            promise.then(function(value) {
                done(new Error('Promise should have timed out'));
            }).catch(function(error) {
                assert(error instanceof Error);
                assert.equal(error.code, 'ETIMEDOUT');
                assert(error.message.includes('Timed out after 50 ms'));
                done();
            });
        });
        
            })
})