let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test passByCopy with promise resolution', function(done) {
        // Test that passByCopy doesn't interfere with promise functionality
        let deferred = q.defer();
        let promise = deferred.promise.passByCopy();
        
        promise.then(function(value) {
            assert.strictEqual(value, 'test value', 'promise should resolve with correct value after passByCopy');
            done();
        }).catch(done);
        
        deferred.resolve('test value');
    });
});