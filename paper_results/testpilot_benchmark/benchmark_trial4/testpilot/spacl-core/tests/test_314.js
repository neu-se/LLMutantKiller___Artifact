let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with different rule types', function(done) {
        try {
            // Create different types of rules
            const booleanRule = true;
            const functionRule = (context) => context.authenticated === true;
            const objectRule = { allow: true, condition: 'user.verified' };
            
            // Create a policy with mixed rule types
            const policy = _spacl_core.Policy.for('mixed-policy', booleanRule, functionRule, objectRule);
            
            // Verify the policy was created
            assert(policy !== null, 'Policy should not be null');
            assert(policy !== undefined, 'Policy should not be undefined');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })