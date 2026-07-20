let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - fulfilled promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Initially should not be fulfilled
        assert.strictEqual(promise.isFulfilled(), false);
        
        // Resolve the promise
        deferred.resolve('test value');
        
        // Should be fulfilled after resolution
        setTimeout(() => {
            assert.strictEqual(promise.isFulfilled(), true);
            done();
        }, 0);
    });
    
    })