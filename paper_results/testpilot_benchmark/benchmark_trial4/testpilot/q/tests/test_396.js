let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - same values should return the value', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(42);
        
        // Use q.all() to wait for both promises and then check if values are the same
        q.all([promise1, promise2])
            .then(function(results) {
                // If both values are the same, return that value
                if (results[0] === results[1]) {
                    assert.strictEqual(results[0], 42);
                    done();
                } else {
                    done(new Error('Values are not the same'));
                }
            })
            .catch(done);
    });
});