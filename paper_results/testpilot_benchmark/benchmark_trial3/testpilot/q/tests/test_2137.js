let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with both object and timeout', function(done) {
        const testObject = { value: 42 };
        const startTime = Date.now();
        const delayMs = 100;
        
        q.delay(testObject, delayMs)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(result, testObject);
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
                done();
            })
            .catch(done);
    });
    
    })