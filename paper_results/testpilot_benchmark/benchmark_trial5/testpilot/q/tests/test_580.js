let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with timeout only', function(done) {
        const startTime = Date.now();
        const delayMs = 100;
        
        q.delay(delayMs)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                // Check that the delay was approximately correct (within 50ms tolerance)
                assert(elapsed >= delayMs - 10, 'Delay should be at least the specified time');
                assert(elapsed < delayMs + 100, 'Delay should not be significantly longer than specified');
                // When called with only timeout, result should be undefined
                assert.strictEqual(result, undefined, 'Result should be undefined when no object is provided');
                done();
            })
            .catch(done);
    });

    })