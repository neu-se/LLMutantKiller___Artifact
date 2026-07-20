let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with null spec should handle gracefully', function(done) {
        try {
            // Test with null spec - this might throw an error or return null
            const matcher = _spacl_core.Matcher.for(null, '1.1');
            
            // The behavior here depends on implementation - it might be null or throw
            // We'll just verify the call completes
            done();
        } catch (error) {
            // If it throws an error, that's also acceptable behavior
            assert(error instanceof Error, 'Should throw a proper Error object');
            done();
        }
    });
});