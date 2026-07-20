let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - rejected promise should propagate rejection', function(done) {
        let promise1 = q.reject(new Error("test error"));
        let promise2 = q.resolve(42);
        
        promise1.join(promise2)
            .then(function(result) {
                done(new Error('Expected an error to be thrown'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, "test error");
                done();
            });
    });
});