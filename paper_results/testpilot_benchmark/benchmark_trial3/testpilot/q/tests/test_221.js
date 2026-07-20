let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with rejected promise', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.reject(new Error('test error'));
        let promise3 = q.resolve(3);
        
        q.Promise.all([promise1, promise2, promise3])
            .then(function(results) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });
});