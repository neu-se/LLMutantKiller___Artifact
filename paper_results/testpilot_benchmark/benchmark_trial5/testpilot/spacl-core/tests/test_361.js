let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap constructor with null/undefined policies', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap(null, undefined);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should handle null/undefined policies gracefully');
            done();
        } catch (error) {
            done(error);
        }
    });
});