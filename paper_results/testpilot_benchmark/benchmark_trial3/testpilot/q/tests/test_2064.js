let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with progress callback', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        q.done(deferred.promise, 
            function(value) {
                assert.equal(value, 'final');
                assert.deepEqual(progressValues, [10, 50, 90]);
                done();
            },
            null,
            function(progress) {
                progressValues.push(progress);
            }
        );
        
        deferred.notify(10);
        deferred.notify(50);
        deferred.notify(90);
        deferred.resolve('final');
    });
});