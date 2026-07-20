let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - rejects if original promise rejects', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let thenResolvePromise = promise.thenResolve('should not be returned');
        
        thenResolvePromise.then(function(value) {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'original rejection');
            done();
        });
        
        // Reject the original promise
        deferred.reject(new Error('original rejection'));
    });
    
    })