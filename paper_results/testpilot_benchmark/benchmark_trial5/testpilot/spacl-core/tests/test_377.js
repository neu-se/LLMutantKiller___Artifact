let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push', function(done) {
        try {
            // Test 1: Push single policy to empty PolicyMap
            const policyMap = new _spacl_core.PolicyMap();
            const policy1 = new _spacl_core.Policy('user');
            
            const result = policyMap.push(policy1);
            
            // Should return the PolicyMap instance for chaining
            assert.strictEqual(result, policyMap);
            
            // Should contain the pushed policy
            assert.strictEqual(policyMap.get('user'), policy1);
            assert.strictEqual(policyMap.size, 1);
            
            // Test 2: Push multiple policies at once
            const policy2 = new _spacl_core.Policy('admin');
            const policy3 = new _spacl_core.Policy('guest');
            
            policyMap.push(policy2, policy3);
            
            // Should contain all three policies
            assert.strictEqual(policyMap.get('admin'), policy2);
            assert.strictEqual(policyMap.get('guest'), policy3);
            assert.strictEqual(policyMap.size, 3);
            
            // Test 3: Push policy with same name should overwrite
            const newUserPolicy = new _spacl_core.Policy('user');
            policyMap.push(newUserPolicy);
            
            // Should overwrite the original user policy
            assert.strictEqual(policyMap.get('user'), newUserPolicy);
            assert.notStrictEqual(policyMap.get('user'), policy1);
            assert.strictEqual(policyMap.size, 3); // Size should remain the same
            
            // Test 4: Push no policies should not change the map
            const sizeBefore = policyMap.size;
            policyMap.push();
            assert.strictEqual(policyMap.size, sizeBefore);
            
            // Test 5: Method chaining should work
            const policy4 = new _spacl_core.Policy('moderator');
            const policy5 = new _spacl_core.Policy('viewer');
            
            const chainResult = policyMap.push(policy4).push(policy5);
            assert.strictEqual(chainResult, policyMap);
            assert.strictEqual(policyMap.get('moderator'), policy4);
            assert.strictEqual(policyMap.get('viewer'), policy5);
            assert.strictEqual(policyMap.size, 5);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});