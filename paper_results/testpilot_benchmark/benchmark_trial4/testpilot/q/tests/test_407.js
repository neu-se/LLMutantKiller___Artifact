let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - handles mixed resolved and pending promises', function(done) {
        let rejectedPromise = q.reject(new Error('immediate error'));
        let deferred = q.defer();
        
        let promises = [deferred.promise, rejectedPromise];
        
        q.race(promises).then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'immediate error');
            done();
        });
        
        // This should resolve later, but race should already be lost
        setTimeout(() => deferred.resolve('delayed success'), 10);
    });
});