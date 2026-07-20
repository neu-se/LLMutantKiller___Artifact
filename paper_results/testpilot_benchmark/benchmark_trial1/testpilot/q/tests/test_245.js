let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - should delay promise resolution', function(done) {
        const startTime = Date.now();
        const delayMs = 100;
        const testValue = 'test value';
        
        q.resolve(testValue)
            .delay(delayMs)
            .then(function(value) {
                const endTime = Date.now();
                const actualDelay = endTime - startTime;
                
                assert.strictEqual(value, testValue, 'Value should be preserved after delay');
                assert(actualDelay >= delayMs, `Delay should be at least ${delayMs}ms, but was ${actualDelay}ms`);
                done();
            })
            .catch(done);
    });

    })