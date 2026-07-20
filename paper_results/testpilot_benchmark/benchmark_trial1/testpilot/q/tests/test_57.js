let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - both promises resolve', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(42);
        
        promise1.join(promise2).then(function(results) {
            assert.strictEqual(Array.isArray(results), true);
            assert.strictEqual(results.length, 2);
            assert.strictEqual(results[0], 42);
            assert.strictEqual(results[1], 42);
            done();
        }).catch(done);
    });
});