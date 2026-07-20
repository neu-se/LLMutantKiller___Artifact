let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.passByCopy', function() {
        
        it('should return the same promise instance', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            let result = promise.passByCopy();
            
            assert.strictEqual(result, promise, 'passByCopy should return the same promise instance');
            done();
        });
        
            })
})