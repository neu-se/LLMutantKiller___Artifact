let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject with non-promise value', function(done) {
        let value = 'not a promise';
        let rejectionReason = new Error('rejection reason');
        
        q.thenReject(value, rejectionReason)
            .then(function(result) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
    });

    })