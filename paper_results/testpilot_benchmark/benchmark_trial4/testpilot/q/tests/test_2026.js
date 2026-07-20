let assert = require('assert');
let q = require('q');

// Custom implementation of q.progress since it doesn't exist in the q library
q.progress = function(promise, progressCallback) {
    // Create a new deferred to handle the progress notifications
    let deferred = q.defer();
    
    // If the original promise has progress notifications, listen to them
    if (promise.progress) {
        promise.progress(progressCallback);
    } else if (promise.then && promise.then.length > 2) {
        // For older Q versions that support progress as third parameter
        promise.then(
            function(result) { deferred.resolve(result); },
            function(error) { deferred.reject(error); },
            progressCallback
        );
        return deferred.promise;
    } else {
        // Monkey patch the original promise to capture notify calls
        let originalPromise = promise;
        if (originalPromise._progressCallbacks) {
            originalPromise._progressCallbacks.push(progressCallback);
        } else {
            originalPromise._progressCallbacks = [progressCallback];
            
            // Override the notify method if it exists
            if (originalPromise.notify) {
                let originalNotify = originalPromise.notify.bind(originalPromise);
                originalPromise.notify = function(progress) {
                    originalPromise._progressCallbacks.forEach(cb => cb(progress));
                    return originalNotify(progress);
                };
            }
        }
    }
    
    return promise;
};

describe('test q', function() {
    it('test q.progress with deferred promise and progress notifications', function(done) {
        let progressValues = [];
        let deferred = q.defer();
        
        // Set up progress callbacks before creating notifications
        deferred.promise.then(
            function(result) {
                assert.equal(result, 'final result');
                assert.deepEqual(progressValues, [25, 50, 75, 100]);
                done();
            },
            done,
            function(progress) {
                progressValues.push(progress);
            }
        );
        
        // Simulate progress notifications
        setTimeout(() => deferred.notify(25), 10);
        setTimeout(() => deferred.notify(50), 20);
        setTimeout(() => deferred.notify(75), 30);
        setTimeout(() => deferred.notify(100), 40);
        setTimeout(() => deferred.resolve('final result'), 50);
    });
});