let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should reject with undefined reason', function(done) {
        let resolvedPromise = q.resolve('data');
        
        resolvedPromise.thenReject(undefined)
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, undefined);
                done();
            });
    });

    })