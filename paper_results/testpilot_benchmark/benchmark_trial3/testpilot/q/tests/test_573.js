let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - should return false for rejected promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject(new Error('test error'));
        
        // Allow promise to settle
        setImmediate(() => {
            assert.strictEqual(promise.isFulfilled(), false);
            done();
        });
    });
});