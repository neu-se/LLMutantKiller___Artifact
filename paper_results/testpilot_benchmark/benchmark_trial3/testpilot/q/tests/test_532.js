let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should work with already rejected promise', function(done) {
        let rejectedPromise = q.reject('original rejection');
        let newRejectionReason = 'new rejection';
        
        rejectedPromise.thenReject(newRejectionReason)
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                // Should maintain original rejection, not apply thenReject
                assert.strictEqual(error, 'original rejection');
                done();
            });
    });

    })