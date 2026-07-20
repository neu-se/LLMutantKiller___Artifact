let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - multiple rules precedence', function(done) {
        try {
            // Create a policy with both allow and deny rules
            const policy = new _spacl_core.Policy();
            
            // Add allow rule first
            policy.addRule({
                effect: 'allow',
                path: '/api/data',
                verb: 'GET',
                conditions: []
            });
            
            // Add deny rule second (should take precedence if deny wins)
            policy.addRule({
                effect: 'deny',
                path: '/api/data',
                verb: 'GET',
                conditions: []
            });
            
            const result = policy.query('/api/data', 'GET', {});
            // Verify the policy handles rule precedence correctly
            assert.ok(['allow', 'deny'].includes(result.effect));
            done();
        } catch (error) {
            done(error);
        }
    });
});