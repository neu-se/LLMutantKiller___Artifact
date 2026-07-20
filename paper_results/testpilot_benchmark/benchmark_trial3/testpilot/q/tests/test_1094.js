let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - works with already resolved promise', function(done) {
        const deferred = q.defer();
        const testValue = 'already resolved';
        
        // Resolve immediately
        deferred.resolve(testValue);
        
        const startTime = Date.now();
        deferred.promise
            .delay(75)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= 75, 'Should still delay even if promise was already resolved');
                assert.strictEqual(value, testValue, 'Value should be preserved');
                done();
            })
            .catch(done);
    });
});