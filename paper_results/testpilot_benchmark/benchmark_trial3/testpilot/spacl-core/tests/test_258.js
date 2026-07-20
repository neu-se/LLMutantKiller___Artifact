let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            // Test 1: Basic push functionality
            const basePolicy = Policy.for('user', 
                Rule.for('/user/+').allow('get')
            );
            
            const originalRuleCount = basePolicy.rules ? basePolicy.rules.length : 0;
            
            // Push a single rule
            const result = basePolicy.push(Rule.for('/user/:id').allow('put'));
            
            // Verify push returns the policy (for chaining)
            assert.strictEqual(result, basePolicy, 'push should return the policy instance');
            
            // Verify rule was added
            const newRuleCount = basePolicy.rules ? basePolicy.rules.length : 0;
            assert.strictEqual(newRuleCount, originalRuleCount + 1, 'should add one rule');
            
            // Test 2: Push multiple rules at once
            const policy2 = Policy.for('admin');
            const initialCount = policy2.rules ? policy2.rules.length : 0;
            
            policy2.push(
                Rule.for('/admin/+').allow('get', 'post'),
                Rule.for('/admin/:id').allow('put'),
                Rule.for('/admin/:id').deny('delete')
            );
            
            const finalCount = policy2.rules ? policy2.rules.length : 0;
            assert.strictEqual(finalCount, initialCount + 3, 'should add three rules');
            
            // Test 3: Push with no arguments (edge case)
            const policy3 = Policy.for('test');
            const beforeCount = policy3.rules ? policy3.rules.length : 0;
            const pushResult = policy3.push();
            
            assert.strictEqual(pushResult, policy3, 'push with no args should return policy');
            const afterCount = policy3.rules ? policy3.rules.length : 0;
            assert.strictEqual(afterCount, beforeCount, 'push with no args should not change rule count');
            
            // Test 4: Verify rules are actually accessible after push
            const policy4 = Policy.for('verify');
            const testRule = Rule.for('/test').allow('get');
            policy4.push(testRule);
            
            // Check that the rule exists in the policy
            assert(policy4.rules && policy4.rules.length > 0, 'policy should have rules after push');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })