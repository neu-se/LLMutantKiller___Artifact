let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap constructor with single policy', function(done) {
        try {
            const mockPolicy = { name: 'testPolicy', rules: [] };
            const policyMap = new _spacl_core.PolicyMap(mockPolicy);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance with single policy');
            done();
        } catch (error) {
            done(error);
        }
    });
});