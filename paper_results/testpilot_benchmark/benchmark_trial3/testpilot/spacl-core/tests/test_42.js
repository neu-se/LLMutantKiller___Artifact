let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for creates new instances', function(done) {
        // Test that multiple calls create separate instances
        const spec1 = '/path1';
        const spec2 = '/path2';
        const matcher1 = _spacl_core.Matcher.for(spec1);
        const matcher2 = _spacl_core.Matcher.for(spec2);
        
        assert(matcher1 !== matcher2, 'Should create different instances');
        assert.strictEqual(matcher1.spec, spec1, 'First matcher should have correct spec');
        assert.strictEqual(matcher2.spec, spec2, 'Second matcher should have correct spec');
        done();
    });
});