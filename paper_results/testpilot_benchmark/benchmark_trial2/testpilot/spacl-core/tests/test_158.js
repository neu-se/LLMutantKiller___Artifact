let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - single policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const mockPolicy = { id: 'policy1', name: 'Test Policy 1' };
            
            const result = policyMap.push(mockPolicy);
            
            // Verify the policy was added by checking if it exists at index 0
            assert.deepStrictEqual(policyMap[0], mockPolicy);
            
            // If PolicyMap has a size property instead of length, use that
            // Or if it has a method to get count, use that instead
            // For now, we'll just verify the policy exists
            
            done();
        } catch (error) {
            done(error);
        }
    });
});