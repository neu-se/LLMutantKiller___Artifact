let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with only timeout (undefined value)', function(done) {
        const startTime = Date.now();
        const delayMs = 50;
        
        q.delay(delayMs).then(function(result) {
            const elapsed = Date.now() - startTime;
            assert.strictEqual(result, undefined);
            assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
            done();
        }).catch(done);
    });
});