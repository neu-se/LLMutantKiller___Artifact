let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - with context conditions', function(done) {
        try {
            // Create a policy that allows access only for admin users
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/sensitive',
                verb: 'GET',
                conditions: [
                    { field: 'user.role', operator: 'equals', value: 'admin' }
                ]
            });
            
            // Test with admin context
            const adminCtx = { user: { role: 'admin' } };
            const adminResult = policy.query('/api/sensitive', 'GET', adminCtx);
            assert.strictEqual(adminResult.effect, 'allow');
            
            // Test with non-admin context
            const userCtx = { user: { role: 'user' } };
            const userResult = policy.query('/api/sensitive', 'GET', userCtx);
            assert.notStrictEqual(userResult.effect, 'allow');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })