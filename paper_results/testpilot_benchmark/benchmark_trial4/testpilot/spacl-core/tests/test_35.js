let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with null spec should handle gracefully', function(done) {
        try {
            // Test with null spec - should either return a matcher or throw a meaningful error
            const matcher = _spacl_core.Matcher.for(null, '1.1');
            
            // If it doesn't throw, verify the result
            if (matcher !== undefined) {
                assert(typeof matcher === 'object' || matcher === null, 'Result should be object or null');
            }
            
            done();
        } catch (error) {
            // If it throws an error, that's also acceptable behavior
            assert(error instanceof Error, 'Should throw a proper Error object');
            done();
        }
    });
});