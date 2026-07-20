let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with default version', function(done) {
        try {
            // Test with a simple spec object and default version
            const spec = {
                type: 'string',
                pattern: '^test.*',
                match: function(value) {
                    // Simple match implementation for testing
                    if (this.type === 'string' && typeof value === 'string') {
                        const regex = new RegExp(this.pattern);
                        return regex.test(value);
                    }
                    return false;
                }
            };
            
            const matcher = _spacl_core.Matcher.for(spec);
            
            // Verify that a matcher object is returned
            assert(matcher !== null, 'Matcher should not be null');
            assert(typeof matcher === 'object', 'Matcher should be an object');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});