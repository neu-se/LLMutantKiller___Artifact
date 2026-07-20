let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with resolved promise', function(done) {
        const testValue = 'test result';
        const delayTime = 100;
        const startTime = Date.now();
        
        q.delay(q.resolve(testValue), delayTime)
            .then(function(result) {
                const endTime = Date.now();
                const elapsed = endTime - startTime;
                
                assert.strictEqual(result, testValue);
                assert(elapsed >= delayTime, `Expected delay of at least ${delayTime}ms, but got ${elapsed}ms`);
                done();
            })
            .catch(done);
    });

    })