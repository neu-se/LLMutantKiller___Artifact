let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - rejects with first rejected promise', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let racePromise = q.Promise.race([deferred1.promise, deferred2.promise, deferred3.promise]);
        
        racePromise.then(function(value) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'first error');
            done();
        });
        
        // Reject the first promise first
        setTimeout(() => deferred1.reject(new Error('first error')), 10);
        setTimeout(() => deferred2.resolve('success'), 20);
        setTimeout(() => deferred3.resolve('another success'), 30);
    });
});