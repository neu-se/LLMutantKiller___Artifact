let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should reject with original error when promise rejects before timeout', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise.timeout(100);
            
            // Reject the promise quickly
            setTimeout(() => {
                deferred.reject(new Error('Original rejection'));
            }, 10);
            
            promise.then(function(value) {
                done(new Error('Promise should have been rejected'));
            }).catch(function(error) {
                assert.equal(error.message, 'Original rejection');
                assert.notEqual(error.code, 'ETIMEDOUT');
                done();
            });
        });
        
            })
})