let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isRejected - should return false for pending promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        assert.strictEqual(promise.isRejected(), false);
        done();
    });
});