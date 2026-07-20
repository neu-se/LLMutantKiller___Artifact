let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - basic delay functionality', function(done) {
        const startTime = Date.now();
        const delayMs = 100;
        
        const promise = q.resolve('test value');
        promise.delay(delayMs).then(function(value) {
            const elapsed = Date.now() - startTime;
            assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but only ${elapsed}ms elapsed`);
            assert.strictEqual(value, 'test value', 'Promise value should be preserved after delay');
            done();
        }).catch(done);
    });
});