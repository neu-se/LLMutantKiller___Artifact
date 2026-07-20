let mocha = require('mocha');
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
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
                assert.strictEqual(value, testValue, 'Value should be preserved after delay');
                done();
            })
            .catch(done);
    });

    })