let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress - basic progress notification', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.progress(function(progress) {
            progressValues.push(progress);
        }).then(function(result) {
            assert.deepEqual(progressValues, [25, 50, 75, 100]);
            assert.equal(result, 'completed');
            done();
        }).catch(done);
        
        // Simulate progress updates
        setTimeout(() => deferred.notify(25), 10);
        setTimeout(() => deferred.notify(50), 20);
        setTimeout(() => deferred.notify(75), 30);
        setTimeout(() => deferred.notify(100), 40);
        setTimeout(() => deferred.resolve('completed'), 50);
    });
});