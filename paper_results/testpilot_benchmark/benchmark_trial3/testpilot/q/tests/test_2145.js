let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay passes rejections immediately', function(done) {
        const startTime = Date.now();
        const errorMessage = 'test error';
        const delayMs = 200;
        const rejectedPromise = q.reject(new Error(errorMessage));
        
        q.delay(rejectedPromise, delayMs).then(function() {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            const elapsed = Date.now() - startTime;
            assert.strictEqual(error.message, errorMessage);
            assert(elapsed < delayMs, `Rejection should be immediate, but took ${elapsed}ms`);
            done();
        });
    });

    })