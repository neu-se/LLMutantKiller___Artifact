let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with resolved promise', function(done) {
        let progressCalled = false;
        let progressValue = null;
        
        let deferred = q.defer();
        
        // Set up progress handler before resolving
        deferred.promise.progress(function(progress) {
            progressCalled = true;
            progressValue = progress;
        }).then(function(result) {
            assert.equal(result, 'success');
            assert.equal(progressCalled, false); // Progress should not be called for already resolved promise
            done();
        }).catch(done);
        
        // Resolve the promise immediately
        deferred.resolve('success');
    });
});