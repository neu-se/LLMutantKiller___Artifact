let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - rejects if all promises reject', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise];
        let anyPromise = q.any(promises);
        
        anyPromise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert(error instanceof Error);
            done();
        });
        
        // Reject both promises
        setTimeout(() => deferred1.reject(new Error('error1')), 10);
        setTimeout(() => deferred2.reject(new Error('error2')), 20);
    });
});