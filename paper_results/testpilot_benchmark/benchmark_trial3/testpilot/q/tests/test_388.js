let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - should throw error for different types', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve("42");
        
        promise1.join(promise2)
            .then(function(result) {
                done(new Error('Expected join to fail but it succeeded'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert(error.message.includes("Q can't join: not the same"));
                done();
            });
    });
});