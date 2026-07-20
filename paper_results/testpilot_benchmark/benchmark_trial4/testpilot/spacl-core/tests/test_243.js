let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - single rule', function(done) {
        // Create a new Policy instance
        let policy = new _spacl_core.Policy();
        
        // Create a mock rule
        let rule1 = { id: 'rule1', condition: 'test' };
        
        // Test pushing a single rule
        let result = policy.push(rule1);
        
        // Verify the rule was added
        assert.strictEqual(policy.rules.length, 1);
        assert.strictEqual(policy.rules[0], rule1);
        
        // Verify the method returns the policy instance (for chaining)
        assert.strictEqual(result, policy);
        
        done();
    });
});