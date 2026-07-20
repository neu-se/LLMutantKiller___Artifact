let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - works with already resolved promises', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        let racePromise = q.Promise.race([resolvedPromise, deferred.promise]);
        
        racePromise.then(function(value) {
            assert.equal(value, 'immediate');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise is already resolved
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
});