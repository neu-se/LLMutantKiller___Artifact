let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with custom version', function(done) {
        try {
            // Test with a simple spec object and custom version
            const spec = { type: 'number', min: 0, max: 100 };
            const matcher = _spacl_core.Matcher.for(spec, '2.0');
            
            // Verify that a matcher object is returned
            assert(matcher !== null, 'Matcher should not be null');
            assert(typeof matcher === 'object', 'Matcher should be an object');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});