let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should not interfere with promise rejection', function(done) {
        let deferred = q.defer();
        
        deferred.promise.progress(function(value) {
            // Progress handler that doesn't affect rejection
        }).then(function(result) {
            done(new Error('Promise should have been rejected'));
        }, function(error) {
            assert.strictEqual(error.message, 'test error', 'Promise should reject normally');
            done();
        }).catch(done);
        
        deferred.notify('progress update');
        deferred.reject(new Error('test error'));
    });
});