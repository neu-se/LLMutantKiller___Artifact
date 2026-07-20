let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with multiple policies', function(done) {
        try {
            const policy1 = {
                name: 'policy1',
                rules: ['rule1']
            };
            const policy2 = {
                name: 'policy2',
                rules: ['rule2']
            };
            const policy3 = {
                name: 'policy3',
                rules: ['rule3']
            };
            
            const policyMap = _spacl_core.PolicyMap.for(policy1, policy2, policy3);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
            done();
        } catch (error) {
            done(error);
        }
    });
});