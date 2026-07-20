let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
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

    })