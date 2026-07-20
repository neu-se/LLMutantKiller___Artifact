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
                path: '/api/secure',
                verb: 'GET',
                conditions: [
                    { field: 'user.role', operator: 'equals', value: 'admin' }
                ]
            });
            
            // Test with admin context
            const adminResult = policy.query('/api/secure', 'GET', { user: { role: 'admin' } });
            assert.strictEqual(adminResult.effect, 'allow', 'Should allow admin user');
            
            // Test with non-admin context
            const userResult = policy.query('/api/secure', 'GET', { user: { role: 'user' } });
            assert.strictEqual(userResult.effect, 'deny', 'Should deny non-admin user');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })