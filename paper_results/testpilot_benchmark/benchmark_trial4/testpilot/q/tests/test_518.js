let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - resolves with specified value', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedValue = 'test value';
        let thenResolvePromise = promise.thenResolve(resolvedValue);
        
        thenResolvePromise.then(function(value) {
            assert.strictEqual(value, resolvedValue);
            done();
        }).catch(done);
        
        // Resolve the original promise
        deferred.resolve('original value');
    });
    
    })