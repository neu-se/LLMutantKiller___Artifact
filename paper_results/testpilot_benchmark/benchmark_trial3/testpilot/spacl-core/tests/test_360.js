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

    })