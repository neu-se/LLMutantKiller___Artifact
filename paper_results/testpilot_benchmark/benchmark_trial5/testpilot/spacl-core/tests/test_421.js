let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with multiple policies', function(done) {
        try {
            const mockPolicy1 = {
                name: 'policy1',
                permissions: ['read', 'write']
            };
            const mockPolicy2 = {
                name: 'policy2',
                permissions: ['execute']
            };
            const policyMap = _spacl_core.PolicyMap.for(mockPolicy1, mockPolicy2);
            assert(policyMap !== null, 'PolicyMap should not be null');
            assert(typeof policyMap === 'object', 'PolicyMap should be an object');
            done();
        } catch (error) {
            done(error);
        }
    });

    })