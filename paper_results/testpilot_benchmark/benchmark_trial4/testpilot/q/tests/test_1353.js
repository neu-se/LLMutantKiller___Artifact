let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject with rejected promise', function(done) {
        let originalError = new Error('original error');
        let rejectedPromise = q.reject(originalError);
        let rejectionReason = new Error('forced rejection');
        
        q.thenReject(rejectedPromise, rejectionReason)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                // Should preserve the original rejection reason
                assert.strictEqual(error, originalError);
                done();
            });
    });

    })