let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - works with mixed resolved and pending promises', function(done) {
        let resolvedPromise = q.resolve('already resolved');
        let rejectedPromise = q.reject(new Error('already rejected'));
        let deferred = q.defer();
        
        let promise = q([deferred.promise, resolvedPromise, rejectedPromise]);
        
        promise.race().then(function(result) {
            // Should get the resolved promise since it's already resolved
            assert.strictEqual(result, 'already resolved');
            done();
        }).catch(function(error) {
            // Might get rejected promise if it settles first
            assert.strictEqual(error.message, 'already rejected');
            done();
        });
    });
});