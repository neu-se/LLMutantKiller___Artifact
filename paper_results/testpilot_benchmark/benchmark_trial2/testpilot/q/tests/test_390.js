let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject with resolved promise', function(done) {
        let resolvedPromise = q.resolve('success');
        let rejectionReason = new Error('forced rejection');
        
        q.thenReject(resolvedPromise, rejectionReason)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
    });

    })