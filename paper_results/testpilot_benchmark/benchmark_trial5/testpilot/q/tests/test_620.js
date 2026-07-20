let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict allows using q without global pollution', function(done) {
        // Call noConflict to get a clean reference
        let cleanQ = q.noConflict();
        
        // Verify we can still use all q functionality
        let deferred = cleanQ.defer();
        let promise = cleanQ.when(42);
        
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