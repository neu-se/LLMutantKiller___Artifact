let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap constructor with mixed valid and invalid policies', function(done) {
        try {
            const validPolicy = { name: 'validPolicy', rules: [] };
            const invalidPolicy = 'not a policy object';
            
            const policyMap = new _spacl_core.PolicyMap(validPolicy, invalidPolicy);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance even with mixed inputs');
            done();
        } catch (error) {
            done(error);
        }
    });
});