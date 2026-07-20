let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with resolved promise', function(done) {
        const startTime = Date.now();
        const testValue = { data: 'promise result' };
        const delayMs = 75;
        const promise = q.resolve(testValue);
        
        q.delay(promise, delayMs).then(function(result) {
            const elapsed = Date.now() - startTime;
            assert.deepStrictEqual(result, testValue);
            assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
            done();
        }).catch(done);
    });
});