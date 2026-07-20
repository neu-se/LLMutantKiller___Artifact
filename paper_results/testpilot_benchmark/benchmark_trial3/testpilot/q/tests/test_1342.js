let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject - should work with string rejection reason', function(done) {
        let resolvedPromise = q.resolve(42);
        let rejectionReason = 'String rejection reason';
        
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