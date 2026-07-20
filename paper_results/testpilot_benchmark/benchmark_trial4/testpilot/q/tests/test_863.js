let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - resolves immediately with already resolved promise', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        let promises = [resolvedPromise, deferred.promise];
        
        q.any(promises).then(function(result) {
            assert.equal(result, 'immediate');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise is already resolved
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
    
    })