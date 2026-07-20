let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - rejects when all promises reject', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        
        q.any(promises).then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert(error instanceof Error);
            done();
        });
        
        // Reject all promises
        setTimeout(() => deferred1.reject(new Error('error1')), 10);
        setTimeout(() => deferred2.reject(new Error('error2')), 20);
        setTimeout(() => deferred3.reject(new Error('error3')), 30);
    });
});