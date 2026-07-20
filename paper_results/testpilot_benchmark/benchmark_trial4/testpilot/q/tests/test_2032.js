let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress - no progress notifications after resolution', function(done) {
        let deferred = q.defer();
        let progressCount = 0;
        
        let promise = deferred.promise.progress(function(value) {
            progressCount++;
        });
        
        deferred.notify('progress1');
        deferred.resolve('resolved');
        
        // These should not trigger progress callbacks
        deferred.notify('progress2');
        deferred.notify('progress3');
        
        promise.then(function(result) {
            assert.equal(result, 'resolved');
            assert.equal(progressCount, 1);
            done();
        }).catch(done);
    });
});