let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should handle multiple progress notifications', function(done) {
        let progressValues = [];
        
        let deferred = q.defer();
        
        deferred.promise.progress(function(value) {
            progressValues.push(value);
        }).then(function(result) {
            assert.strictEqual(progressValues.length, 3, 'Should have received 3 progress notifications');
            assert.deepStrictEqual(progressValues, [10, 50, 90], 'Progress values should match');
            assert.strictEqual(result, 'done', 'Final result should match');
            done();
        }).catch(done);
        
        // Simulate multiple progress notifications
        deferred.notify(10);
        deferred.notify(50);
        deferred.notify(90);
        deferred.resolve('done');
    });
});