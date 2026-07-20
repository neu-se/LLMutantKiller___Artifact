let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - works with undefined value', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let thenResolvePromise = promise.thenResolve(undefined);
        
        thenResolvePromise.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
        
        deferred.resolve('original');
    });
});