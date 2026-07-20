let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should call fulfilled callback when promise resolves', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise.then(function(value) {
                assert.equal(value, 'test value');
                done();
            });
            
            deferred.resolve('test value');
        });

            })
})