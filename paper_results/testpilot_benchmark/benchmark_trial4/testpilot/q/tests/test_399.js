let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - both promises reject', function(done) {
        let promise1 = q.reject(new Error('first error'));
        let promise2 = q.reject(new Error('second error'));
        
        promise1.join(promise2).then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            // Should reject with the first error
            assert.strictEqual(error.message, 'first error');
            done();
        });
    });
});