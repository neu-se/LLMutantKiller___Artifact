let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with resolved promise', function(done) {
        let progressCalled = false;
        let progressValue = null;
        
        let resolvedPromise = q.resolve('success');
        
        q.progress(resolvedPromise, function(progress) {
            progressCalled = true;
            progressValue = progress;
        }).then(function(result) {
            assert.equal(result, 'success');
            assert.equal(progressCalled, false); // Progress should not be called for already resolved promise
            done();
        }).catch(done);
    });

    })