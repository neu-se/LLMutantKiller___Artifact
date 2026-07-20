let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.done with progress callback', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let progressCalled = false;
        
        promise.done(
            function(value) {
                assert.equal(value, 'final');
                assert.equal(progressCalled, true);
                done();
            },
            null,
            function(progress) {
                assert.equal(progress, 'working');
                progressCalled = true;
            }
        );
        
        deferred.notify('working');
        deferred.resolve('final');
    });
});