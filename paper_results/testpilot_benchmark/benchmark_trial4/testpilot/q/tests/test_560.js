let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - after reject', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject(new Error('test error'));
        
        // Use nextTick to ensure the promise state has been updated
        process.nextTick(() => {
            assert.strictEqual(promise.isPending(), false, 'Promise should not be pending after reject');
            done();
        });
    });
});