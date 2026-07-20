let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - multiple rules', function(done) {
        // Create a new Policy instance
        let policy = new _spacl_core.Policy();
        
        // Create mock rules
        let rule1 = { id: 'rule1', condition: 'test1' };
        let rule2 = { id: 'rule2', condition: 'test2' };
        let rule3 = { id: 'rule3', condition: 'test3' };
        
        // Test pushing multiple rules at once
        let result = policy.push(rule1, rule2, rule3);
        
        // Verify all rules were added
        assert.strictEqual(policy.rules.length, 3);
        assert.strictEqual(policy.rules[0], rule1);
        assert.strictEqual(policy.rules[1], rule2);
        assert.strictEqual(policy.rules[2], rule3);
        
        // Verify the method returns the policy instance
        assert.strictEqual(result, policy);
        
        done();
    });

    })