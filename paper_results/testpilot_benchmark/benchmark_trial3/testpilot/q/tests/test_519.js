let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve chaining', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resultPromise = promise
            .thenResolve('first')
            .thenResolve('second')
            .thenResolve('third');
        
        resultPromise.then(function(value) {
            assert.strictEqual(value, 'third');
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
});