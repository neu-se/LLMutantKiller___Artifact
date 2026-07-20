let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test fapply with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('rejected'));
        
        rejectedPromise.fapply([1, 2, 3])
            .then(function() {
                assert.fail('Should have been rejected');
            })
            .catch(function(error) {
                assert.equal(error.message, 'rejected');
                done();
            });
    });
});