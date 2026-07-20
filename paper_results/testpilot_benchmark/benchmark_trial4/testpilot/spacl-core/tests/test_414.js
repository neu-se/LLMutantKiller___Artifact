let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with mixed valid and invalid policies', function(done) {
        try {
            const validPolicy = {
                name: 'validPolicy',
                rules: ['rule1']
            };
            const invalidPolicy = 'not a policy object';
            
            const policyMap = _spacl_core.PolicyMap.for(validPolicy, invalidPolicy);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
            done();
        } catch (error) {
            done(error);
        }
    });
});