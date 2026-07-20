let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - preserves rejection', function(done) {
        const startTime = Date.now();
        const delayMs = 50;
        const errorMessage = 'test error';
        
        const promise = q.reject(new Error(errorMessage));
        promise.delay(delayMs).then(function() {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            const elapsed = Date.now() - startTime;
            assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but only ${elapsed}ms elapsed`);
            assert.strictEqual(error.message, errorMessage, 'Error should be preserved after delay');
            done();
        });
    });
});