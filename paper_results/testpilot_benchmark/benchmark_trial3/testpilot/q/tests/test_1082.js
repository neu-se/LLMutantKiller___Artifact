let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.timeout - times out with default error', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise.timeout(100);
        
        // Don't resolve the promise, let it timeout
        
        promise.then(() => {
            done(new Error('Promise should have timed out'));
        }).catch(error => {
            assert(error instanceof Error);
            assert(error.message.includes('Timed out'));
            done();
        });
    });
});