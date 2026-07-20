let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - waits for original promise to resolve', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedValue = { key: 'value' };
        let thenResolvePromise = promise.thenResolve(resolvedValue);
        
        let resolved = false;
        thenResolvePromise.then(function(value) {
            resolved = true;
            assert.deepStrictEqual(value, resolvedValue);
            done();
        }).catch(done);
        
        // Verify promise hasn't resolved yet
        setTimeout(function() {
            assert.strictEqual(resolved, false);
            // Now resolve the original promise
            deferred.resolve('anything');
        }, 10);
    });
    
    })