let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with null object', function(done) {
        const delayMs = 25;
        const startTime = Date.now();
        
        q.delay(null, delayMs)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(result, null);
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
                done();
            })
            .catch(done);
    });
});