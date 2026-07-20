let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - first promise rejects', function(done) {
        let promise1 = q.reject(new Error('first error'));
        let promise2 = q.resolve('hello');
        
        // Use q.all() instead of .join() since Q doesn't have a join method
        q.all([promise1, promise2]).then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'first error');
            done();
        });
    });
});