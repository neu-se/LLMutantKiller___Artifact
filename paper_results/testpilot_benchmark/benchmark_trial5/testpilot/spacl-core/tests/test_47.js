let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with empty object spec', function(done) {
        // Test that Matcher.for handles empty object spec
        const emptySpec = {};
        const matcher = _spacl_core.Matcher.for(emptySpec);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.spec, emptySpec, 'Should handle empty object spec');
        assert.strictEqual(matcher.version, '1.1', 'Should use default version');
        done();
    });
});