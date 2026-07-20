let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with null/undefined policies', function(done) {
        try {
            const policyMap = _spacl_core.PolicyMap.for(null, undefined);
            assert(policyMap !== null, 'PolicyMap should not be null even with null/undefined inputs');
            done();
        } catch (error) {
            done(error);
        }
    });
});