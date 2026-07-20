let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for returns new instance each time', function(done) {
        try {
            const mockPolicy = { name: 'testPolicy', rules: [] };
            const policyMap1 = _spacl_core.PolicyMap.for(mockPolicy);
            const policyMap2 = _spacl_core.PolicyMap.for(mockPolicy);
            
            assert(policyMap1 instanceof _spacl_core.PolicyMap, 'First call should return PolicyMap instance');
            assert(policyMap2 instanceof _spacl_core.PolicyMap, 'Second call should return PolicyMap instance');
            assert(policyMap1 !== policyMap2, 'Should return different instances');
            done();
        } catch (error) {
            done(error);
        }
    });

    })