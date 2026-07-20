let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - ignores original promise value', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let newValue = 42;
        let chainedPromise = promise.thenResolve(newValue);
        
        chainedPromise.then(function(value) {
            assert.strictEqual(value, newValue);
            assert.notStrictEqual(value, 'ignored original value');
            done();
        }).catch(done);
        
        // Resolve with a different value that should be ignored
        deferred.resolve('ignored original value');
    });
});