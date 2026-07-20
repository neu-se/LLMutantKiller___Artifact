let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with progress callback', function(done) {
        let deferred = q.defer();
        let progressCalled = false;
        
        q.done(deferred.promise,
            function(value) {
                assert.equal(value, 'final result');
                assert.equal(progressCalled, true);
                done();
            },
            null,
            function(progress) {
                assert.equal(progress, 'progress update');
                progressCalled = true;
            }
        );
        
        deferred.notify('progress update');
        deferred.resolve('final result');
    });
});