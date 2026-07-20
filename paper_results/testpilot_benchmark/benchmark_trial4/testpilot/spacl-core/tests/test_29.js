let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with custom version', function(done) {
        // Test creating a Matcher with custom version
        const spec = '/api/v2/users/+';
        const version = '2.0';
        const matcher = _spacl_core.Matcher.for(spec, version);
        
        // Verify that a Matcher instance is returned
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        
        // Verify that the matcher was created with the correct spec
        assert.strictEqual(matcher.spec, spec, 'Should store the provided spec');
        
        // Verify that the custom version is used
        assert.strictEqual(matcher.version, version, 'Should use the provided custom version');
        
        done();
    });
});