let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - with context', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            policyMap.add('context-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow',
                condition: function(ctx) {
                    return ctx.user && ctx.user.role === 'admin';
                }
            });
            
            const context = { user: { role: 'admin' } };
            const result = policyMap.query('context-policy', '/api/users', 'GET', context);
            assert.strictEqual(result.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });
});