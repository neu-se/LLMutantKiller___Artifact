let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with rejected promise', function(done) {
        let progressCalled = false;
        let error = new Error('test error');
        
        let rejectedPromise = q.reject(error);
        
        q.progress(rejectedPromise, function(progress) {
            progressCalled = true;
        }).then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(err) {
            assert.equal(err, error);
            assert.equal(progressCalled, false); // Progress should not be called for rejected promise
            done();
        });
    });

    })