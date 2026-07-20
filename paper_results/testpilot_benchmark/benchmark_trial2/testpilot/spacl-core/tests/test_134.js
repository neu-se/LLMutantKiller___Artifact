let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - wildcard path matching', function(done) {
        try {
            // Create a policy with wildcard path
            const policy = new _spacl_core.Policy();
            
            // Try different method names that might exist
            const rule = {
                effect: 'allow',
                path: '/api/*',
                verb: 'GET',
                conditions: []
            };
            
            // Check if it's add instead of addRule
            if (typeof policy.add === 'function') {
                policy.add(rule);
            } else if (typeof policy.addStatement === 'function') {
                policy.addStatement(rule);
            } else if (typeof policy.allow === 'function') {
                policy.allow('/api/*', 'GET');
            } else {
                // If none of the above work, try constructor with rules
                const policyWithRules = new _spacl_core.Policy([rule]);
                const result1 = policyWithRules.query('/api/users', 'GET', {});
                const result2 = policyWithRules.query('/api/posts', 'GET', {});
                
                assert.strictEqual(result1.effect, 'allow');
                assert.strictEqual(result2.effect, 'allow');
                done();
                return;
            }
            
            const result1 = policy.query('/api/users', 'GET', {});
            const result2 = policy.query('/api/posts', 'GET', {});
            
            assert.strictEqual(result1.effect, 'allow');
            assert.strictEqual(result2.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });
});