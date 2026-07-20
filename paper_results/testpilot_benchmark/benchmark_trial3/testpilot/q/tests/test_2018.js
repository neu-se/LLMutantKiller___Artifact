let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with rejected promise', function(done) {
        let progressCalled = false;
        let error = new Error('test error');
        
        let deferred = q.defer();
        
        // Set up progress handler
        let promise = deferred.promise.progress(function(progress) {
            progressCalled = true;
        });
        
        // Reject the promise
        deferred.reject(error);
        
        promise.then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(err) {
            assert.equal(err, error);
            assert.equal(progressCalled, false); // Progress should not be called for rejected promise
            done();
        });
    });
});