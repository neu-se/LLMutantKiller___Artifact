let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap - should handle callback that returns rejected promise', function(done) {
        let callbackError = new Error('async callback error');
        
        let promise = q.resolve('success');
        
        q.tap(promise, function(value) {
            return q.reject(callbackError);
        }).then(function(result) {
            done(new Error('Should not resolve when callback returns rejected promise'));
        }).catch(function(err) {
            assert.strictEqual(err, callbackError, 'Should reject with callback promise error');
            done();
        });
    });
});