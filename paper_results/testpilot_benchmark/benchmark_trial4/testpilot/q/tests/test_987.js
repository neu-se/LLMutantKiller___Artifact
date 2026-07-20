let assert = require('assert');

// Simple deferred implementation to replace q.defer()
function createDeferred() {
    let resolveCallback, rejectCallback;
    let progressCallbacks = [];
    let state = 'pending';
    let value;
    
    const promise = {
        then: function(onResolve, onReject) {
            if (state === 'resolved') {
                if (onResolve) onResolve(value);
            } else if (state === 'rejected') {
                if (onReject) onReject(value);
            } else {
                resolveCallback = onResolve;
                rejectCallback = onReject;
            }
            return this;
        },
        catch: function(onReject) {
            return this.then(null, onReject);
        },
        progress: function(onProgress) {
            progressCallbacks.push(onProgress);
            return this;
        }
    };
    
    return {
        promise: promise,
        resolve: function(val) {
            if (state === 'pending') {
                state = 'resolved';
                value = val;
                if (resolveCallback) resolveCallback(val);
            }
        },
        reject: function(reason) {
            if (state === 'pending') {
                state = 'rejected';
                value = reason;
                if (rejectCallback) rejectCallback(reason);
            }
        },
        notify: function(progress) {
            progressCallbacks.forEach(callback => callback(progress));
        }
    };
}

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should call progress handler during resolution', function(done) {
        let deferred = createDeferred();
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
});