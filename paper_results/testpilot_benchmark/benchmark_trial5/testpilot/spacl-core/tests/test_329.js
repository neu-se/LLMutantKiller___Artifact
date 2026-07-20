let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with single rule', function(done) {
        try {
            // Create a simple rule function
            const rule1 = (context) => context.user === 'admin';
            
            // Create a policy with a single rule
            const policy = _spacl_core.Policy.for('test-policy', rule1);
            
            // Verify the policy was created
            assert(policy !== null, 'Policy should not be null');
            assert(policy !== undefined, 'Policy should not be undefined');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })