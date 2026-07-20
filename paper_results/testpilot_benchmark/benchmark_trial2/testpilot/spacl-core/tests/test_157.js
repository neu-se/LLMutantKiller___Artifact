let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - multiple policies', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const policy1 = { id: 'policy1', name: 'Test Policy 1' };
            const policy2 = { id: 'policy2', name: 'Test Policy 2' };
            const policy3 = { id: 'policy3', name: 'Test Policy 3' };
            
            const result = policyMap.push(policy1, policy2, policy3);
            
            // Verify all policies were added by checking individual elements
            assert.deepStrictEqual(policyMap[0], policy1);
            assert.deepStrictEqual(policyMap[1], policy2);
            assert.deepStrictEqual(policyMap[2], policy3);
            
            done();
        } catch (error) {
            done(error);
        }
    });
})