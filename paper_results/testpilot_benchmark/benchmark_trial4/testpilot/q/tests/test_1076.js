let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.timeout - times out with custom error', function(done) {
        let deferred = q.defer();
        let customError = new Error('Custom timeout message');
        let promise = deferred.promise.timeout(100, customError);
        
        // Don't resolve the promise, let it timeout
        
        promise.then(() => {
            done(new Error('Promise should have timed out'));
        }).catch(error => {
            assert.equal(error, customError);
            assert.equal(error.message, 'Custom timeout message');
            done();
        });
    });
});