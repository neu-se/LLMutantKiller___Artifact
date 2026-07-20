let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - append to existing rules', function(done) {
        try {
            const policy = new _spacl_core.Policy();
            const existingRule = { action: 'allow', resource: 'existing' };
            const newRule = { action: 'deny', resource: 'new' };
            
            // Add initial rule
            policy.push(existingRule);
            const initialLength = policy.length;
            
            // Add new rule
            policy.push(newRule);
            
            // Verify both rules exist
            assert.strictEqual(policy.length, initialLength + 1);
            assert.deepStrictEqual(policy[0], existingRule);
            assert.deepStrictEqual(policy[1], newRule);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});