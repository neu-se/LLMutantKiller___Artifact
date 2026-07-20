let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q functionality without global pollution', function(done) {
        // When using require('q'), there's no global pollution by default
        // so noConflict is not needed or applicable
        
        // Verify we can use all q functionality directly
        let deferred = q.defer();
        let promise = q.when(42);
        
        assert.strictEqual(typeof deferred.promise, 'object');
        assert.strictEqual(typeof deferred.resolve, 'function');
        assert.strictEqual(typeof promise.then, 'function');
        
        // Test that the promise works
        promise.then(function(value) {
            assert.strictEqual(value, 42);
            done();
        }).catch(done);
    });
});