```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - single policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const mockPolicy = { id: 'policy1', name: 'Test Policy 1' };
            
            const result = policyMap.push(mockPolicy);
            
            // Verify the policy was added
            assert.strictEqual(policyMap.length, 1);
            assert.deepStrictEqual(policyMap[0], mockPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - multiple policies', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const policy1 = { id: 'policy1', name: 'Test Policy 1' };
            const policy2 = { id: 'policy2', name: 'Test Policy 2' };
            const policy3 = { id: 'policy3', name: 'Test Policy 3' };
            
            const result = policyMap.push(policy1, policy2, policy3);
            
            // Verify all policies were added
            assert.strictEqual(policyMap.length, 3);
            assert.deepStrictEqual(policyMap[0], policy1);
            assert.deepStrictEqual(policyMap[1], policy2);
            assert.deepStrictEqual(policyMap[2], policy3);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - empty call', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const initialLength = policyMap.length;
            
            const result = policyMap.push();
            
            // Verify no policies were added
            assert.strictEqual(policyMap.length, initialLength);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - append to existing policies', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const existingPolicy = { id: 'existing', name: 'Existing Policy' };
            const newPolicy1 = { id: 'new1', name: 'New Policy 1' };
            const newPolicy2 = { id: 'new2', name: 'New Policy 2' };
            
            // Add initial policy
            policyMap.push(existingPolicy);
            assert.strictEqual(policyMap.length, 1);
            
            // Add more policies
            policyMap.push(newPolicy1, newPolicy2);
            
            // Verify all policies are present in correct order
            assert.strictEqual(policyMap.length, 3);
            assert.deepStrictEqual(policyMap[0], existingPolicy);
            assert.deepStrictEqual(policyMap[1], newPolicy1);
            assert.deepStrictEqual(policyMap[2], newPolicy2);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - return value', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const policy = { id: 'policy1', name: 'Test Policy' };
            
            const result = policyMap.push(policy);
            
            // Verify return value is the new length (similar to Array.push)
            assert.strictEqual(result, 1);
            assert.strictEqual