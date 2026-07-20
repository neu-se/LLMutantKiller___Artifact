let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - should handle rejected promises', function(done) {
        let promise1 = q.reject(new Error("test error"));
        let promise2 = q.resolve(42);
        
        promise1.join(promise2)
            .then(function(result) {
                done(new Error('Expected join to fail but it succeeded'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, "test error");
                done();
            });
    });
});