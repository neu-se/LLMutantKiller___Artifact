let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - after resolve', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.resolve('test value');
        
        // Use nextTick to ensure the promise state has been updated
        process.nextTick(() => {
            assert.strictEqual(promise.isPending(), false, 'Promise should not be pending after resolve');
            done();
        });
    });
});