let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - with object reason', function(done) {
        const reason = { code: 404, message: 'Not found' };
        const rejectedPromise = q.Promise.reject(reason);
        
        rejectedPromise.catch(function(rejectionReason) {
            assert.deepStrictEqual(rejectionReason, reason);
            done();
        }).catch(done);
    });
});