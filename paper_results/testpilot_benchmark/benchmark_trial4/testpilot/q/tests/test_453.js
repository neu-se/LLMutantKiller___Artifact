let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should catch exceptions in rejected callback', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise.then(null, function(error) {
                throw new Error('rejection handler error');
            }).then(null, function(newError) {
                assert.equal(newError.message, 'rejection handler error');
                done();
            });
            
            deferred.reject(new Error('original error'));
        });

            })
})