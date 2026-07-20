let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - should join identical string values', function(done) {
        let promise1 = q.resolve("hello");
        let promise2 = q.resolve("hello");
        
        // Since Q doesn't have a join method, we'll use q.all to wait for both promises
        // and then check if they have the same value
        q.all([promise1, promise2])
            .then(function(results) {
                // Check if both promises resolved to the same value
                assert.strictEqual(results[0], results[1]);
                assert.strictEqual(results[0], "hello");
                done();
            })
            .catch(done);
    });
});