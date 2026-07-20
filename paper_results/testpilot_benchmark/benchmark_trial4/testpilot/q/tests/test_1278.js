let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nodeify with promise that resolves later', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.nodeify(function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'delayed success');
            done();
        });
        
        setTimeout(function() {
            deferred.resolve('delayed success');
        }, 10);
    });
});