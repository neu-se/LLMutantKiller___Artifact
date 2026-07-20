let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with null and undefined policies', function(done) {
        try {
            const mockPolicy = { name: 'validPolicy', rules: [] };
            const policyMap = _spacl_core.PolicyMap.for(mockPolicy, null, undefined);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance even with null/undefined');
            done();
        } catch (error) {
            done(error);
        }
    });

    })