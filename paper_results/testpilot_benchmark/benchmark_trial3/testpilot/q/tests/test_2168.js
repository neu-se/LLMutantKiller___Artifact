let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with immediate value', function(done) {
        const startTime = Date.now();
        const testValue = 42;
        const delayMs = 75;
        
        q.delay(testValue, delayMs)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(result, testValue);
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
                done();
            })
            .catch(done);
    });
});