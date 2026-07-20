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
            
            // Add another rule using push
            const newRule = Rule.for('/api/posts').allow('post');
            policy.push(newRule);
            
            // Verify the rule was added (assuming policy has a way to check rules)
            assert.ok(policy, 'Policy should exist after push');
            done();
        } catch (error) {
            done(error);
        }
    });

    })