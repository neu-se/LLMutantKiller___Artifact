let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - return value', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const policy = { id: 'policy1', name: 'Test Policy' };
            
            const result = policyMap.push(policy);
            
            // Verify return value is the new length (similar to Array.push)
            assert.strictEqual(result, 1);
            assert.strictEqual(result, policyMap.length);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});