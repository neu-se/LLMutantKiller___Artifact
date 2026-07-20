let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - should return false for promise rejected with Q.reject', function(done) {
        let promise = q.reject(new Error('immediate error'));
        
        setImmediate(() => {
            assert.strictEqual(promise.isFulfilled(), false);
            done();
        });
    });
});