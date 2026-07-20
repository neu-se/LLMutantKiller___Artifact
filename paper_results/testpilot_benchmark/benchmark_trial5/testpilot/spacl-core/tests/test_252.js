let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - adding to existing rules', function(done) {
        // Create a new Policy instance
        let policy = new _spacl_core.Policy();
        
        // Add some initial rules
        let initialRule = { id: 'initial', condition: 'initial' };
        policy.rules.push(initialRule);
        
        // Create new rules to add
        let rule1 = { id: 'rule1', condition: 'test1' };
        let rule2 = { id: 'rule2', condition: 'test2' };
        
        // Test pushing to existing rules
        let result = policy.push(rule1, rule2);
        
        // Verify all rules are present in correct order
        assert.strictEqual(policy.rules.length, 3);
        assert.strictEqual(policy.rules[0], initialRule);
        assert.strictEqual(policy.rules[1], rule1);
        assert.strictEqual(policy.rules[2], rule2);
        
        // Verify the method returns the policy instance
        assert.strictEqual(result, policy);
        
        done();
    });
});