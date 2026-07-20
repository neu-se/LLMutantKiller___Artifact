let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - preserves rejection', function(done) {
        const testError = new Error('test error');
        const delayMs = 50;
        
        const promise = q.reject(testError);
        promise.delay(delayMs).then(function() {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error, testError, 'Original error should be preserved');
            done();
        });
    });

    })