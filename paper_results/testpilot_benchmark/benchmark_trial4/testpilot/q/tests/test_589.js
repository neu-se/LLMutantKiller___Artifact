let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isRejected - should return false for fulfilled promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.resolve('success');
        
        // Give it a tick to resolve
        setImmediate(() => {
            assert.strictEqual(promise.isRejected(), false);
            done();
        });
    });
});