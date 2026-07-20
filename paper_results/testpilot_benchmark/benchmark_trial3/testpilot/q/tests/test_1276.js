let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap - should handle callback that throws error', function(done) {
        let callbackError = new Error('callback error');
        
        let promise = q.resolve('success');
        
        q.tap(promise, function(value) {
            throw callbackError;
        }).then(function(result) {
            done(new Error('Should not resolve when callback throws'));
        }).catch(function(err) {
            assert.strictEqual(err, callbackError, 'Should reject with callback error');
            done();
        });
    });

    })