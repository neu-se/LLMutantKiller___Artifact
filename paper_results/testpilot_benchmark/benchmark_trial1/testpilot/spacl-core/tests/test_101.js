```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - should add single rule to policy', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            // Create initial policy with one rule
            const policy = Policy.for('test-policy', 
                Rule.for('/api/users').allow('get')
            );
            
            // Get initial rule count
            const initialRuleCount = policy.rules ? policy.rules.length : 0;
            
            // Push a new rule
            const newRule = Rule.for('/api/posts').allow('post');
            policy.push(newRule);
            
            // Verify rule was added
            const finalRuleCount = policy.rules ? policy.rules.length : 0;
            assert.strictEqual(finalRuleCount, initialRuleCount + 1, 'Rule count should increase by 1');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.Policy.prototype.push - should add multiple rules to policy', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            // Create initial policy
            const policy = Policy.for('multi-rule-policy');
            const initialRuleCount = policy.rules ? policy.rules.length : 0;
            
            // Push multiple rules at once
            const rule1 = Rule.for('/user/+').allow('get');
            const rule2 = Rule.for('/user/:id').allow('put');
            const rule3 = Rule.for('/admin/+').deny('delete');
            
            policy.push(rule1, rule2, rule3);
            
            // Verify all rules were added
            const finalRuleCount = policy.rules ? policy.rules.length : 0;
            assert.strictEqual(finalRuleCount, initialRuleCount + 3, 'Rule count should increase by 3');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.Policy.prototype.push - should return policy instance for chaining', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            const policy = Policy.for('chainable-policy');
            const rule = Rule.for('/api/test').allow('get');
            
            // Push should return the policy instance
            const result = policy.push(rule);
            
            assert.strictEqual(result, policy, 'push() should return the policy instance for method chaining');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.Policy.prototype.push - should work with cloned policies like in examples', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            // Recreate the example scenario
            const user = Policy.for('user',
                Rule.for('/user/+').allow('get'),
                Rule.for('/user/:name').allow('put')
            );
            
            const admin = user.clone('admin').push(
                Rule.for('/user/+').allow('put', 'post', 'delete'),
                Rule.for('/user/:name').deny('delete')
            );
            
            // Verify admin policy exists and has more rules than user policy
            assert(admin, 'Admin policy should be created');
            assert.strictEqual(admin.name, 'admin', 'Admin policy should have correct name');
            
            const userRuleCount = user.rules ? user.rules.length : 0;
            const adminRuleCount = admin.rules ? admin.rules.length : 0;
            
            assert(adminRuleCount > userRuleCount, 'Admin policy should have more rules than user policy');
            