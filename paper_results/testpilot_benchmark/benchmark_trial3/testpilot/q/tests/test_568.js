let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - should return false for already rejected promise', function(done) {
        let promise = q.reject(new Error('immediate error'));
        
        // Allow promise to settle
        setImmediate(() => {
            assert.strictEqual(promise.isFulfilled(), false);
            done();
        });
    });
});