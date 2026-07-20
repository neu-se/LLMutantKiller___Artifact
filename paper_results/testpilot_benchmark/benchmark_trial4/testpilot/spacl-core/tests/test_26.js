let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with edge cases', function(done) {
        // Test with empty string spec
        const emptyMatcher = _spacl_core.Matcher.for('');
        assert(emptyMatcher instanceof _spacl_core.Matcher, 'Should handle empty string spec');
        assert.strictEqual(emptyMatcher.spec, '', 'Should store empty spec correctly');
        
        // Test with root path
        const rootMatcher = _spacl_core.Matcher.for('/');
        assert(rootMatcher instanceof _spacl_core.Matcher, 'Should handle root path');
        assert.strictEqual(rootMatcher.spec, '/', 'Should store root path correctly');
        
        // Test with version as empty string
        const emptyVersionMatcher = _spacl_core.Matcher.for('/test', '');
        assert(emptyVersionMatcher instanceof _spacl_core.Matcher, 'Should handle empty version');
        assert.strictEqual(emptyVersionMatcher.version, '', 'Should store empty version correctly');
        
        done();
    });
});