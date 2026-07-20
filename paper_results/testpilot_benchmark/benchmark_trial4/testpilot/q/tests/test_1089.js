let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - works with already resolved promise', function(done) {
        const startTime = Date.now();
        const delayMs = 75;
        
        // Create an already resolved promise
        const resolvedPromise = q.resolve('already resolved');
        
        resolvedPromise
            .delay(delayMs)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms even for resolved promise`);
                assert.strictEqual(value, 'already resolved', 'Value should be preserved');
                done();
            })
            .catch(done);
    });
});