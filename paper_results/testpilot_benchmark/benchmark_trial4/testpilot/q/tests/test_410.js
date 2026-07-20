let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - works with already resolved promises', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        let promise = q([resolvedPromise, deferred.promise]);
        
        promise.race().then(function(result) {
            assert.strictEqual(result, 'immediate');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise is already resolved
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
    
    })