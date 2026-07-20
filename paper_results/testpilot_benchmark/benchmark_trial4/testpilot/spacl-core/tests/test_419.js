let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with single policy', function(done) {
        try {
            const mockPolicy = {
                name: 'testPolicy',
                rules: ['rule1', 'rule2']
            };
            const policyMap = _spacl_core.PolicyMap.for(mockPolicy);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
            done();
        } catch (error) {
            done(error);
        }
    });
});