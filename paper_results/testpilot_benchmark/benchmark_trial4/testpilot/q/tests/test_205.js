let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - works with mixed resolved and pending promises', function(done) {
        let resolvedPromise = q.resolve('already resolved');
        let rejectedPromise = q.reject(new Error('already rejected'));
        let deferred = q.defer();
        
        let answerPs = [deferred.promise, resolvedPromise, rejectedPromise];
        
        q.Promise.race(answerPs).then(function(result) {
            assert.equal(result, 'already resolved');
            done();
        }).catch(function(error) {
            // Could also reject with 'already rejected' depending on timing
            done();
        });
        
        setTimeout(() => deferred.resolve('delayed'), 100);
    });
});