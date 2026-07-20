let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.timeout - rejects before timeout', function(done) {
        let deferred = q.defer();
        let originalError = new Error('Original rejection');
        let promise = deferred.promise.timeout(1000, new Error('Timeout error'));
        
        // Reject the promise quickly
        setTimeout(() => {
            deferred.reject(originalError);
        }, 100);
        
        promise.then(() => {
            done(new Error('Promise should have been rejected'));
        }).catch(error => {
            assert.equal(error, originalError);
            assert.equal(error.message, 'Original rejection');
            done();
        });
    });
});