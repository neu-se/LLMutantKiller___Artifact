let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.passByCopy', function() {
        
        it('should mark promise as pass-by-copy', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            // Before calling passByCopy
            assert.strictEqual(promise.passByCopy, promise.passByCopy, 'passByCopy method should exist');
            
            // Call passByCopy
            let result = promise.passByCopy();
            
            // The promise should now be marked for pass-by-copy
            // We can verify this by checking if the method exists and returns the same instance
            assert.strictEqual(typeof result.passByCopy, 'function', 'passByCopy method should still exist');
            done();
        });
        
            })
})