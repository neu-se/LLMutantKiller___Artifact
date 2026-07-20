let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.done throws on unhandled rejection', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Override process.nextTick to catch the thrown error
        let originalNextTick = process.nextTick;
        process.nextTick = function(callback) {
            try {
                callback();
            } catch (error) {
                process.nextTick = originalNextTick;
                assert.equal(error.message, 'unhandled error');
                done();
            }
        };
        
        promise.done(); // No rejection handler provided
        deferred.reject(new Error('unhandled error'));
    });
});