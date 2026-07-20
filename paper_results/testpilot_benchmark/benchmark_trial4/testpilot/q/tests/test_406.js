let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - handles already resolved promises', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        let promises = [resolvedPromise, deferred.promise];
        
        q.race(promises).then(function(result) {
            assert.equal(result, 'immediate');
            done();
        }).catch(done);
        
        // This should resolve later, but race should already be won
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
    
    })