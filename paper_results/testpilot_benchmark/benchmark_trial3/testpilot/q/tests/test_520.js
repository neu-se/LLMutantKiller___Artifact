let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve with object value', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let testObject = { key: 'test', number: 42 };
        
        let resultPromise = promise.thenResolve(testObject);
        
        resultPromise.then(function(value) {
            assert.deepStrictEqual(value, testObject);
            assert.strictEqual(value, testObject); // Should be the same reference
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
});