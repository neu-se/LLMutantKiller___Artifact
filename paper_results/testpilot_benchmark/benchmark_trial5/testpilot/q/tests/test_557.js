let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with resolved promise', function(done) {
        let progressCalled = false;
        let progressValue = null;
        
        let deferred = q.defer();
        
        q.progress(deferred.promise, function(progress) {
            progressCalled = true;
            progressValue = progress;
        }).then(function(result) {
            assert.equal(progressCalled, true, 'Progress callback should have been called');
            assert.equal(progressValue, 'uploading 50%', 'Progress value should match');
            assert.equal(result, 'completed', 'Final result should match');
            done();
        }).catch(done);
        
        // Simulate progress notification
        deferred.notify('uploading 50%');
        
        // Resolve the promise
        setTimeout(() => {
            deferred.resolve('completed');
        }, 10);
    });
    
    })