let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should call progress handler during resolution', function(done) {
        let deferred = q.defer();
        let progressCalled = false;
        let progressValue = null;
        
        deferred.promise.progress(function(progress) {
            progressCalled = true;
            progressValue = progress;
        }).then(function(result) {
            assert.strictEqual(progressCalled, true, 'Progress handler should have been called');
            assert.strictEqual(progressValue, 50, 'Progress value should be 50');
            assert.strictEqual(result, 'completed', 'Final result should be correct');
            done();
        }).catch(done);
        
        // Simulate progress notification
        deferred.notify(50);
        // Resolve the promise
        deferred.resolve('completed');
    });
    
    })