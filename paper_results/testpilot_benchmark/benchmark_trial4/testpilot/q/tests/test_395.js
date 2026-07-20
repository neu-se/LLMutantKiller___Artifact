let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - different values should throw error', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(24);
        
        promise1.join(promise2)
            .then(function(result) {
                done(new Error('Expected an error to be thrown'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert(error.message.includes("Q can't join: not the same"));
                assert(error.message.includes("42"));
                assert(error.message.includes("24"));
                done();
            });
    });
});