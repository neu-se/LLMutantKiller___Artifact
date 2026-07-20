let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with rejected promise', function(done) {
        const startTime = Date.now();
        const testError = new Error('test error');
        const delayMs = 50;
        
        q.delay(q.reject(testError), delayMs)
            .then(function() {
                done(new Error('Expected promise to be rejected'));
            })
            .catch(function(error) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(error, testError);
                assert(elapsed >= delayMs, `Expected delay of at least ${delayMs}ms, but got ${elapsed}ms`);
                done();
            });
    });

    })