let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isRejected - should return true for rejected promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject(new Error('test error'));
        
        // Give it a tick to reject
        setImmediate(() => {
            assert.strictEqual(promise.isRejected, true);
            done();
        });
    });
});