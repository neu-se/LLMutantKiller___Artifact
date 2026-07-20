let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with value and timeout', function(done) {
        const startTime = Date.now();
        const testValue = 'test result';
        const delayMs = 100;
        
        q.delay(testValue, delayMs)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(result, testValue, 'Should resolve with the provided value');
                assert(elapsed >= delayMs - 10, 'Should wait at least the specified delay time');
                assert(elapsed < delayMs + 50, 'Should not wait significantly longer than specified');
                done();
            })
            .catch(done);
    });

    })