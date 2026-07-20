let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - propagates new error if catch throws', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.catch(function(error) {
            throw new Error('New error from catch');
        }).catch(function(newError) {
            assert.equal(newError.message, 'New error from catch');
            done();
        });
        
        deferred.reject(new Error('Original error'));
    });
});