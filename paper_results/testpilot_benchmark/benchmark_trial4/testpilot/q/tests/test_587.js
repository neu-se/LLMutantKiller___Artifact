let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isRejected - should return true for promise rejected with string', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject('string error');
        
        setImmediate(() => {
            assert.strictEqual(promise.isRejected(), true);
            done();
        });
    });
});