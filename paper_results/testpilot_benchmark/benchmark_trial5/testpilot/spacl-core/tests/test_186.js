let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for returns different instances', function(done) {
        // Test that multiple calls return different instances
        const spec1 = { name: 'rule1' };
        const spec2 = { name: 'rule2' };
        
        const rule1 = _spacl_core.Rule.for(spec1);
        const rule2 = _spacl_core.Rule.for(spec2);
        
        // Verify that different instances are returned
        assert(rule1 !== rule2, 'Should return different Rule instances for different calls');
        assert(rule1 instanceof _spacl_core.Rule, 'First rule should be a Rule instance');
        assert(rule2 instanceof _spacl_core.Rule, 'Second rule should be a Rule instance');
        done();
    });
});