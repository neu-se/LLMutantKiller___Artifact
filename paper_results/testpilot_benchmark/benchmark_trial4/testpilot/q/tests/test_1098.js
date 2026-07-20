let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - basic delay without value', function(done) {
        const startTime = Date.now();
        const delayMs = 100;
        
        q.delay(delayMs).then(function(result) {
            const elapsed = Date.now() - startTime;
            assert(elapsed >= delayMs - 10, 'Should delay for at least the specified time');
            assert(elapsed < delayMs + 50, 'Should not delay significantly longer than specified');
            assert.strictEqual(result, undefined, 'Should resolve with undefined when no value provided');
            done();
        }).catch(done);
    });
});