let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should work with already rejected promise', function(done) {
        let promise = q.reject(new Error('original error'));
        
        q.timeout(promise, 100)
            .then(() => {
                done(new Error('Should have been rejected'));
            })
            .catch(error => {
                assert.equal(error.message, 'original error');
                done();
            });
    });
});