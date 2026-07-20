let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for creates new instances', function(done) {
        // Test that multiple calls create different instances
        let spec1 = { id: 1 };
        let spec2 = { id: 2 };
        let matcher1 = _spacl_core.Matcher.for(spec1);
        let matcher2 = _spacl_core.Matcher.for(spec2);
        
        assert(matcher1 !== matcher2, 'Should create different instances');
        assert.notStrictEqual(matcher1.spec, matcher2.spec, 'Should have different specs');
        done();
    });
});