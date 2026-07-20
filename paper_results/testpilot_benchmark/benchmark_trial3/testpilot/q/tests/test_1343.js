let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject - should work with object rejection reason', function(done) {
        let resolvedPromise = q.resolve('data');
        let rejectionReason = { code: 500, message: 'Server error' };
        
        q.thenReject(resolvedPromise, rejectionReason)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(reason) {
                assert.deepStrictEqual(reason, rejectionReason);
                done();
            });
    });

    })