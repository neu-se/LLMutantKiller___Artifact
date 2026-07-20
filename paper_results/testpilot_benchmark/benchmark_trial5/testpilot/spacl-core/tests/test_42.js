let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for creates new instances', function(done) {
        // Test that each call creates a new instance
        const spec = '/test/path';
        const matcher1 = _spacl_core.Matcher.for(spec);
        const matcher2 = _spacl_core.Matcher.for(spec);
        
        assert(matcher1 instanceof _spacl_core.Matcher, 'First matcher should be a Matcher instance');
        assert(matcher2 instanceof _spacl_core.Matcher, 'Second matcher should be a Matcher instance');
        assert.notStrictEqual(matcher1, matcher2, 'Should create different instances');
        assert.strictEqual(matcher1.spec, matcher2.spec, 'Should have same spec');
        assert.strictEqual(matcher1.version, matcher2.version, 'Should have same version');
        done();
    });
});