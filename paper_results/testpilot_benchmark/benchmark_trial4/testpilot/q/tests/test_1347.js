let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject - should reject with specified reason when promise resolves', function(done) {
        let resolvedPromise = q.resolve('success');
        let rejectionReason = new Error('Custom rejection reason');
        
        q.thenReject(resolvedPromise, rejectionReason)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, rejectionReason);
                done();
            });
    });

    })