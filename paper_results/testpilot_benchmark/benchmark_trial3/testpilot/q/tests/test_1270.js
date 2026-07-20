let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nodeify with promise that rejects later', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let testError = new Error('delayed error');
        
        promise.nodeify(function(err, result) {
            assert.strictEqual(err, testError);
            assert.strictEqual(result, undefined);
            done();
        });
        
        // Reject the promise after setting up the nodeify callback
        setTimeout(function() {
            deferred.reject(testError);
        }, 10);
    });
});