let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - basic allow policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            // Add a simple allow policy
            policyMap.add('test-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow'
            });
            
            const result = policyMap.query('test-policy', '/api/users', 'GET', {});
            assert.strictEqual(result.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });
});