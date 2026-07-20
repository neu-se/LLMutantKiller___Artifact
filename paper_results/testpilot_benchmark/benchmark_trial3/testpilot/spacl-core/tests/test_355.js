let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap constructor with mixed valid and invalid policies', function(done) {
        try {
            const validPolicy = { name: 'validPolicy', rules: [] };
            const invalidPolicy = 'invalidPolicy';
            
            const policyMap = new _spacl_core.PolicyMap(validPolicy, invalidPolicy, null);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance with mixed policies');
            done();
        } catch (error) {
            done(error);
        }
    });
});