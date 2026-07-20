let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with resolved promise', function(done) {
        let progressCalled = false;
        let progressValue = null;
        
        let resolvedPromise = q.resolve('success');
        
        // For already resolved promises, progress callbacks are not called
        resolvedPromise.progress(function(progress) {
            progressCalled = true;
            progressValue = progress;
        }).then(function(result) {
            assert.equal(result, 'success');
            assert.equal(progressCalled, false); // Progress should not be called for already resolved promise
            done();
        }).catch(done);
    });
});