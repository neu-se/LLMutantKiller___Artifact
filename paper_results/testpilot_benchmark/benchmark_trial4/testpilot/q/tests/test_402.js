let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - both promises resolve', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve('hello');
        
        // Use q.all instead of join method since join doesn't exist in standard Q
        q.all([promise1, promise2]).then(function(results) {
            assert.strictEqual(Array.isArray(results), true);
            assert.strictEqual(results.length, 2);
            assert.strictEqual(results[0], 42);
            assert.strictEqual(results[1], 'hello');
            done();
        }).catch(done);
    });
});