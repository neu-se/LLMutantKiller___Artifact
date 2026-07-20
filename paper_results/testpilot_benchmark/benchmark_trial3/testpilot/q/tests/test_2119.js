let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - rejects before timeout', function(done) {
        let rejectedPromise = q.reject(new Error('Original error'));
        
        q.timeout(rejectedPromise, 100)
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Original error');
                done();
            });
    });
});