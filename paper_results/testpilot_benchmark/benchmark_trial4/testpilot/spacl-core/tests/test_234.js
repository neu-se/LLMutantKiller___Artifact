let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - chaining calls', function(done) {
        // Create a new Policy instance
        let policy = new _spacl_core.Policy();
        
        // Create mock rules
        let rule1 = { id: 'rule1', condition: 'test1' };
        let rule2 = { id: 'rule2', condition: 'test2' };
        let rule3 = { id: 'rule3', condition: 'test3' };
        
        // Test chaining multiple push calls
        let result = policy.push(rule1).push(rule2, rule3);
        
        // Verify all rules were added in correct order
        assert.strictEqual(policy.rules.length, 3);
        assert.strictEqual(policy.rules[0], rule1);
        assert.strictEqual(policy.rules[1], rule2);
        assert.strictEqual(policy.rules[2], rule3);
        
        // Verify the final result is still the policy instance
        assert.strictEqual(result, policy);
        
        done();
    });

    })