let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should only call callbacks once even with multiple dispatches', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            let callCount = 0;
            
            promise.then(function(value) {
                callCount++;
                assert.equal(callCount, 1);
                assert.equal(value, 'first');
                setTimeout(done, 10); // Give time for any additional calls
            });
            
            deferred.resolve('first');
            // Attempt to resolve again (should be ignored)
            deferred.resolve('second');
        });

            })
})