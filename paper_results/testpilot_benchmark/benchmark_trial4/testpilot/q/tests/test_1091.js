let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - delays promise resolution', function(done) {
        const startTime = Date.now();
        const delayMs = 100;
        const testValue = 'test value';
        
        q.resolve(testValue)
            .delay(delayMs)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= delayMs, 'Promise should be delayed by at least ' + delayMs + 'ms');
                assert.strictEqual(value, testValue, 'Promise should resolve with original value');
                done();
            })
            .catch(done);
    });
});