let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - handles mixed resolved and pending promises', function(done) {
        let resolvedPromise = q.resolve('already resolved');
        let deferred = q.defer();
        
        // Create a proper promise object to call race on
        let dummyPromise = q.defer().promise;
        
        q.makePromise.prototype.race.call(dummyPromise, [resolvedPromise, deferred.promise]).then(function(result) {
            assert.equal(result, 'already resolved');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise wins
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
});