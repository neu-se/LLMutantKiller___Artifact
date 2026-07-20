let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - progress callback throws exception', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let errorHandled = false;
        
        // Store original onerror handler
        let originalOnError = q.onerror;
        
        // Set up custom error handler
        q.onerror = function(error) {
            assert.equal(error.message, 'progress error');
            errorHandled = true;
        };
        
        promise.then(function(value) {
            assert.equal(value, 'final value');
            assert.equal(errorHandled, true);
            // Restore original handler
            q.onerror = originalOnError;
            done();
        }, null, function(progress) {
            throw new Error('progress error');
        });
        
        deferred.notify('progress value');
        deferred.resolve('final value');
    });
});