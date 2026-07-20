let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - mixed resolved and pending promises', function(done) {
        let resolvedPromise = q.resolve('already resolved');
        let rejectedPromise = q.reject(new Error('already rejected'));
        let deferred = q.defer();
        
        let answerPs = [deferred.promise, resolvedPromise, rejectedPromise];
        
        q.Promise.race(answerPs).then(function(result) {
            assert.equal(result, 'already resolved');
            done();
        }).catch(done);
        
        // This won't affect the result
        setTimeout(() => deferred.resolve('too late'), 10);
    });
});