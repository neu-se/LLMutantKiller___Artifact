let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - should return true for fulfilled promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.resolve('test value');
        
        // Give it a moment to resolve
        setImmediate(() => {
            assert.strictEqual(promise.isFulfilled(), true);
            done();
        });
    });
    
    })