let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should reject with given reason when promise resolves', function(done) {
        let resolvedPromise = q.resolve('success');
        let rejectionReason = new Error('test rejection');
        
        resolvedPromise.thenReject(rejectionReason)
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
    });

    })