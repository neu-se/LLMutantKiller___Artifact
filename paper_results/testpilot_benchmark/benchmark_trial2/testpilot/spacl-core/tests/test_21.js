let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with specific version', function(done) {
        try {
            // Test with a spec object and specific version
            const spec = {
                type: 'number',
                minimum: 0,
                maximum: 100
            };
            
            const matcher = _spacl_core.Matcher.for(spec, '1.0');
            
            // Verify that a matcher object is returned
            assert(matcher !== null, 'Matcher should not be null');
            assert(typeof matcher === 'object', 'Matcher should be an object');
            
            // Test that the matcher has a match method
            assert(typeof matcher.match === 'function', 'Matcher should have a match method');
            
            // Test the matcher functionality
            const validValue = 50;
            const invalidValue = 150;
            
            assert(matcher.match(validValue) === true, 'Valid value should match');
            assert(matcher.match(invalidValue) === false, 'Invalid value should not match');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});