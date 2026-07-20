let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with no policies', function(done) {
        // Test creating an empty PolicyMap
        const policyMap = _spacl_core.PolicyMap.for();
        
        assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
        done();
    });
});