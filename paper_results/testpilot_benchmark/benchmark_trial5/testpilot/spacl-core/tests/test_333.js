let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with complex rule functions', function(done) {
        try {
            // Create more complex rule functions
            const authenticationRule = (context) => {
                return context.authenticated === true && context.token !== null;
            };
            
            const authorizationRule = (context) => {
                return context.permissions && context.permissions.includes('read');
            };
            
            const timeBasedRule = (context) => {
                const now = new Date();
                return context.validFrom <= now && now <= context.validTo;
            };
            
            // Create a policy with complex rules
            const policy = _spacl_core.Policy.for(
                'complex-policy', 
                authenticationRule, 
                authorizationRule, 
                timeBasedRule
            );
            
            // Verify the policy was created
            assert(policy !== null, 'Policy should not be null');
            assert(policy !== undefined, 'Policy should not be undefined');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});