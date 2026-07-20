const assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with multiple policies', function(done) {
        try {
            const mockPolicy1 = { name: 'policy1', rules: ['rule1'] };
            const mockPolicy2 = { name: 'policy2', rules: ['rule2'] };
            const mockPolicy3 = { name: 'policy3', rules: ['rule3'] };
            
            const policyMap = _spacl_core.PolicyMap.for(mockPolicy1, mockPolicy2, mockPolicy3);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
            done();
        } catch (error) {
            done(error);
        }
    });
});