let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should call rejected callback when promise rejects', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise.then(null, function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
            
            deferred.reject(new Error('test error'));
        });

            })
})