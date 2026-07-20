let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy returns the same promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let result = promise.passByCopy();
        
        // passByCopy should return the same promise instance
        assert.strictEqual(result, promise);
        
        deferred.resolve('test value');
        promise.then(function(value) {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
    });

    })