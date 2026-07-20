let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.reject with non-promise value', function(done) {
        let rejectionReason = new Error('rejection reason');
        
        q.reject(rejectionReason)
            .then(function(result) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
    });
});