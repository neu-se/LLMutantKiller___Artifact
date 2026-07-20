let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should resolve before timeout when promise resolves quickly', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise.timeout(100);
            
            // Resolve the promise immediately
            setTimeout(() => {
                deferred.resolve('success');
            }, 10);
            
            promise.then(function(value) {
                assert.equal(value, 'success');
                done();
            }).catch(done);
        });
        
            })
})