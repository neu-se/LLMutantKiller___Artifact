let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with multiple rules', function(done) {
        try {
            // Create multiple rule functions
            const rule1 = (context) => context.user === 'admin';
            const rule2 = (context) => context.role === 'manager';
            const rule3 = (context) => context.department === 'IT';
            
            // Create a policy with multiple rules
            const policy = _spacl_core.Policy.for('multi-rule-policy', rule1, rule2, rule3);
            
            // Verify the policy was created
            assert(policy !== null, 'Policy should not be null');
            assert(policy !== undefined, 'Policy should not be undefined');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })