let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with different policy names', function(done) {
        try {
            const rule = (context) => true;
            
            // Create policies with different names
            const policy1 = _spacl_core.Policy.for('policy-one', rule);
            const policy2 = _spacl_core.Policy.for('policy-two', rule);
            const policy3 = _spacl_core.Policy.for('policy_three', rule);
            
            // Verify all policies were created
            assert(policy1 !== null, 'Policy1 should not be null');
            assert(policy2 !== null, 'Policy2 should not be null');
            assert(policy3 !== null, 'Policy3 should not be null');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })