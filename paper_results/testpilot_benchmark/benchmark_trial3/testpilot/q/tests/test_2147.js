let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with promise that resolves after some time', function(done) {
        const startTime = Date.now();
        const testValue = 'delayed promise result';
        const promiseDelay = 30;
        const additionalDelay = 50;
        
        const slowPromise = q.delay(testValue, promiseDelay);
        
        q.delay(slowPromise, additionalDelay).then(function(result) {
            const elapsed = Date.now() - startTime;
            assert.strictEqual(result, testValue);
            assert(elapsed >= promiseDelay + additionalDelay, 
                `Expected total delay of at least ${promiseDelay + additionalDelay}ms, but got ${elapsed}ms`);
            done();
        }).catch(done);
    });
});