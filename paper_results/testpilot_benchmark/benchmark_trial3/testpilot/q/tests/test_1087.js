let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - chaining with other operations', function(done) {
        const startTime = Date.now();
        const delayMs = 75;
        
        q.resolve(10)
            .then(function(value) {
                return value * 2;
            })
            .delay(delayMs)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but only ${elapsed}ms elapsed`);
                assert.strictEqual(value, 20, 'Promise chain should work correctly with delay');
                done();
            })
            .catch(done);
    });

    })