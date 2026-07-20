let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - should return true for already resolved promise', function(done) {
        let promise = q.resolve('immediate value');
        
        // Allow promise to settle
        setImmediate(() => {
            assert.strictEqual(promise.isFulfilled(), true);
            done();
        });
    });
});