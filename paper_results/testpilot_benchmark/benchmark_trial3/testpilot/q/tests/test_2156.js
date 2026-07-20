let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with promise as object', function(done) {
        const resolvedValue = 'resolved';
        const promise = q.resolve(resolvedValue);
        const delayMs = 30;
        const startTime = Date.now();
        
        q.delay(promise, delayMs)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(result, resolvedValue);
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
                done();
            })
            .catch(done);
    });
});