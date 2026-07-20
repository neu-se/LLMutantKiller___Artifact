let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push', function(done) {
        try {
            // Test 1: Basic push functionality with single rule
            const policy1 = new _spacl_core.Policy('test-policy');
            const rule1 = _spacl_core.Rule.for('/api/users').allow('get');
            
            const result1 = policy1.push(rule1);
            
            // Should return the policy instance for chaining
            assert.strictEqual(result1, policy1);
            
            // Should have added the rule to the policy
            assert.strictEqual(policy1.rules.length, 1);
            assert.strictEqual(policy1.rules[0], rule1);

            // Test 2: Push multiple rules at once
            const policy2 = new _spacl_core.Policy('test-policy-2');
            const rule2 = _spacl_core.Rule.for('/api/posts').allow('post');
            const rule3 = _spacl_core.Rule.for('/api/comments').allow('put');
            
            policy2.push(rule2, rule3);
            
            assert.strictEqual(policy2.rules.length, 2);
            assert.strictEqual(policy2.rules[0], rule2);
            assert.strictEqual(policy2.rules[1], rule3);

            // Test 3: Push to existing policy with rules
            const policy3 = _spacl_core.Policy.for('existing-policy',
                _spacl_core.Rule.for('/initial').allow('get')
            );
            
            const newRule = _spacl_core.Rule.for('/additional').allow('post');
            policy3.push(newRule);
            
            assert.strictEqual(policy3.rules.length, 2);
            assert.strictEqual(policy3.rules[1], newRule);

            // Test 4: Chaining multiple push calls
            const policy4 = new _spacl_core.Policy('chain-test');
            const chainRule1 = _spacl_core.Rule.for('/chain1').allow('get');
            const chainRule2 = _spacl_core.Rule.for('/chain2').allow('post');
            const chainRule3 = _spacl_core.Rule.for('/chain3').allow('put');
            
            const chainResult = policy4
                .push(chainRule1)
                .push(chainRule2, chainRule3);
            
            assert.strictEqual(chainResult, policy4);
            assert.strictEqual(policy4.rules.length, 3);
            assert.strictEqual(policy4.rules[0], chainRule1);
            assert.strictEqual(policy4.rules[1], chainRule2);
            assert.strictEqual(policy4.rules[2], chainRule3);

            // Test 5: Push with no arguments (edge case)
            const policy5 = new _spacl_core.Policy('empty-push');
            const initialLength = policy5.rules.length;
            
            const emptyResult = policy5.push();
            
            assert.strictEqual(emptyResult, policy5);
            assert.strictEqual(policy5.rules.length, initialLength);

            done();
        } catch (error) {
            done(error);
        }
    });
});