let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap - should handle rejected promise', function(done) {
        let callbackCalled = false;
        let error = new Error('test error');
        
        let promise = q.reject(error);
        
        q.tap(promise, function(value) {
            callbackCalled = true;
        }).then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(err) {
            assert.strictEqual(callbackCalled, false, 'Callback should not be called for rejected promise');
            assert.strictEqual(err, error, 'Original error should be passed through');
            done();
        });
    });

    })