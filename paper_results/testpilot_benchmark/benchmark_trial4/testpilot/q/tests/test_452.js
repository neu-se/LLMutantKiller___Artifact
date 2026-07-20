let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should catch exceptions in fulfilled callback', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise.then(function(value) {
                throw new Error('callback error');
            }).then(null, function(error) {
                assert.equal(error.message, 'callback error');
                done();
            });
            
            deferred.resolve('test');
        });

            })
})