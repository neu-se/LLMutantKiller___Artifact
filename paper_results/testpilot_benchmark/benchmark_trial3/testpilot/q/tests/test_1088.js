let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - multiple delays', function(done) {
        const startTime = Date.now();
        const firstDelay = 30;
        const secondDelay = 40;
        const totalExpectedDelay = firstDelay + secondDelay;
        
        q.resolve('test')
            .delay(firstDelay)
            .delay(secondDelay)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= totalExpectedDelay, `Expected total delay of at least ${totalExpectedDelay}ms, but only ${elapsed}ms elapsed`);
                assert.strictEqual(value, 'test', 'Promise value should be preserved through multiple delays');
                done();
            })
            .catch(done);
    });
});