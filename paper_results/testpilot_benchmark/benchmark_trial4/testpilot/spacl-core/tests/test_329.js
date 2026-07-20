let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for - creates policy with name and rules', function(done) {
        const { Rule, Policy } = _spacl_core;
        
        // Create a policy with a name and multiple rules
        const policy = Policy.for('testPolicy',
            Rule.for('/api/users').allow('get'),
            Rule.for('/api/users/:id').allow('put', 'delete')
        );
        
        // Verify the policy was created with the correct name
        assert.strictEqual(policy.name, 'testPolicy');
        
        // Verify the policy contains the expected number of rules
        assert.strictEqual(policy.rules.length, 2);
        
        done();
    });

    })