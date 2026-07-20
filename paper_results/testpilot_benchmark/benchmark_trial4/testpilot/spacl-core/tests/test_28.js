let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with different spec patterns', function(done) {
        // Test with wildcard pattern
        const wildcardMatcher = _spacl_core.Matcher.for('/user/+');
        assert(wildcardMatcher instanceof _spacl_core.Matcher, 'Should handle wildcard patterns');
        assert.strictEqual(wildcardMatcher.spec, '/user/+', 'Should store wildcard spec correctly');
        
        // Test with parameter pattern
        const paramMatcher = _spacl_core.Matcher.for('/user/:name');
        assert(paramMatcher instanceof _spacl_core.Matcher, 'Should handle parameter patterns');
        assert.strictEqual(paramMatcher.spec, '/user/:name', 'Should store parameter spec correctly');
        
        // Test with simple path
        const simpleMatcher = _spacl_core.Matcher.for('/users');
        assert(simpleMatcher instanceof _spacl_core.Matcher, 'Should handle simple paths');
        assert.strictEqual(simpleMatcher.spec, '/users', 'Should store simple spec correctly');
        
        done();
    });
});