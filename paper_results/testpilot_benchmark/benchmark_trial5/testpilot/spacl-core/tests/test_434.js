let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for creates new instance each time', function(done) {
        // Test that each call creates a new instance
        const policy1 = _spacl_core.Policy.for('test1',
            _spacl_core.Rule.for('/test').allow('get')
        );
        
        const policyMap1 = _spacl_core.PolicyMap.for(policy1);
        const policyMap2 = _spacl_core.PolicyMap.for(policy1);
        
        assert(policyMap1 instanceof _spacl_core.PolicyMap, 'First call should return PolicyMap instance');
        assert(policyMap2 instanceof _spacl_core.PolicyMap, 'Second call should return PolicyMap instance');
        assert(policyMap1 !== policyMap2, 'Should create different instances');
        done();
    });
});