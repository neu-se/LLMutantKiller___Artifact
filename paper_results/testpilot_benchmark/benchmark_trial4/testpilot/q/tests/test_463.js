let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should handle progress notifications', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            let progressValues = [];
            
            promise.then(null, null, function(progress) {
                progressValues.push(progress);
                return progress * 2;
            }).then(function(value) {
                assert.equal(value, 'final');
                assert.deepEqual(progressValues, [25, 50, 75]);
                done();
            }, null, function(transformedProgress) {
                // This should receive the transformed progress values
                assert.equal(transformedProgress % 2, 0);
            });
            
            deferred.notify(25);
            deferred.notify(50);
            deferred.notify(75);
            deferred.resolve('final');
        });

    });
});