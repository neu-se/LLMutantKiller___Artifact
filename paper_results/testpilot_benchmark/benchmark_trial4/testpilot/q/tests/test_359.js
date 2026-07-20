let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy - should mark promise for pass-by-copy', function(done) {
        // Create a simple promise
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Apply passByCopy
        let passByCopyPromise = promise.passByCopy();
        
        // Verify that passByCopy returns a promise
        assert(q.isPromise(passByCopyPromise), 'passByCopy should return a promise');
        
        // Verify that the promise has the passByCopy marker
        assert(passByCopyPromise.passByCopy, 'Promise should have passByCopy property');
        
        // Resolve the original promise and verify the pass-by-copy promise resolves too
        deferred.resolve('test value');
        
        passByCopyPromise.then(function(value) {
            assert.strictEqual(value, 'test value', 'Pass-by-copy promise should resolve with same value');
            done();
        }).catch(done);
    });

    })