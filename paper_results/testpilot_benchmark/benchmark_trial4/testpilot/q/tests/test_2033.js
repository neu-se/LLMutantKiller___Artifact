let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress - progress with object data', function(done) {
        let deferred = q.defer();
        let progressData = [];
        
        let promise = deferred.promise.progress(function(data) {
            progressData.push(data);
        });
        
        // Notify with object progress
        deferred.notify({ step: 1, message: 'Starting' });
        deferred.notify({ step: 2, message: 'Processing' });
        deferred.notify({ step: 3, message: 'Finishing' });
        
        deferred.resolve('done');
        
        promise.then(function(result) {
            assert.equal(result, 'done');
            assert.equal(progressData.length, 3);
            assert.equal(progressData[0].step, 1);
            assert.equal(progressData[1].message, 'Processing');
            assert.equal(progressData[2].step, 3);
            done();
        }).catch(done);
    });
});