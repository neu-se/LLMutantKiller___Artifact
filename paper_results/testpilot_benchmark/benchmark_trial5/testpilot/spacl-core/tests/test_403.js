let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - path mismatch', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            policyMap.add('path-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow'
            });
            
            const result = policyMap.query('path-policy', '/api/posts', 'GET', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });
});