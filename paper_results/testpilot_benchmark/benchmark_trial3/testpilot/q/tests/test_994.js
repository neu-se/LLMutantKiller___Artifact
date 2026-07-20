let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should call progress handler during promise execution', function(done) {
        let progressCalled = false;
        let progressValue = null;
        
        let deferred = q.defer();
        
        deferred.promise.progress(function(value) {
            progressCalled = true;
            progressValue = value;
        }).then(function(result) {
            assert.strictEqual(progressCalled, true, 'Progress handler should have been called');
            assert.strictEqual(progressValue, 'working...', 'Progress value should match');
            assert.strictEqual(result, 'completed', 'Final result should match');
            done();
        }).catch(done);
        
        // Simulate progress notification
        deferred.notify('working...');
        deferred.resolve('completed');
    });
});