let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isRejected - should return true for promise rejected with null', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject(null);
        
        setImmediate(() => {
            assert.strictEqual(promise.isRejected(), true);
            done();
        });
    });
});