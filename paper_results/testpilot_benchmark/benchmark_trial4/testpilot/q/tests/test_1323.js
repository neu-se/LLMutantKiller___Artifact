let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with progress callback', function(done) {
        let deferred = q.defer();
        let progressCalled = false;
        
        q.when(deferred.promise,
            function(value) {
                assert.equal(value, 'final');
                assert.equal(progressCalled, true);
                done();
            },
            function(error) {
                done(error);
            },
            function(progress) {
                assert.equal(progress, 'working');
                progressCalled = true;
            }
        );
        
        deferred.notify('working');
        setTimeout(() => deferred.resolve('final'), 10);
    });
});