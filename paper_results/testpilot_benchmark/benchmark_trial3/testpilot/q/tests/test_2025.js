let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress - basic progress notification', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        let promise = deferred.promise.progress(function(value) {
            progressValues.push(value);
        });
        
        // Notify progress multiple times
        deferred.notify(10);
        deferred.notify(50);
        deferred.notify(100);
        
        // Resolve the promise
        deferred.resolve('completed');
        
        promise.then(function(result) {
            assert.equal(result, 'completed');
            assert.deepEqual(progressValues, [10, 50, 100]);
            done();
        }).catch(done);
    });
});