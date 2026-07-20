let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher', function(done) {
        // Test valid path specification
        let matcher = new _spacl_core.Matcher('/api/users');
        assert.ok(matcher instanceof RegExp);
        assert.equal(matcher.spec, '/api/users');
        
        // Test static constructor
        let staticMatcher = _spacl_core.Matcher.for('/api/posts');
        assert.ok(staticMatcher instanceof _spacl_core.Matcher);
        assert.equal(staticMatcher.spec, '/api/posts');
        
        // Test version parameter
        let versionMatcher = new _spacl_core.Matcher('/api/v1', '1.0');
        assert.equal(versionMatcher.spec, '/api/v1');
        
        // Test Symbol.match behavior - should reject strings ending with slash
        let testMatcher = new _spacl_core.Matcher('/test');
        assert.equal(testMatcher[Symbol.match]('/test/'), null);
        
        done();
    });
});