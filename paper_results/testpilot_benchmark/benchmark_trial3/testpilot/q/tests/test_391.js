let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - should join identical resolved values', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(42);
        
        q.all([promise1, promise2])
            .then(function(results) {
                assert.strictEqual(results[0], 42);
                assert.strictEqual(results[1], 42);
                done();
            })
            .catch(done);
    });
});