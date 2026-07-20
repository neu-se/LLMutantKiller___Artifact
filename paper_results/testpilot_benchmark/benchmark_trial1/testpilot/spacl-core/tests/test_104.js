```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - basic allow rule', function(done) {
        try {
            // Create a simple policy that allows GET requests to /api/users
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/users',
                verb: 'GET',
                conditions: []
            });
            
            const result = policy.query('/api/users', 'GET', {});
            assert.strictEqual(result.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.Policy.prototype.query - basic deny rule', function(done) {
        try {
            // Create a policy that denies DELETE requests to /api/admin
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'deny',
                path: '/api/admin',
                verb: 'DELETE',
                conditions: []
            });
            
            const result = policy.query('/api/admin', 'DELETE', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.Policy.prototype.query - no matching rule', function(done) {
        try {
            // Create a policy with no rules
            const policy = new _spacl_core.Policy();
            
            const result = policy.query('/api/nonexistent', 'GET', {});
            // Should return default deny or undefined effect
            assert.ok(result.effect === 'deny' || result.effect === undefined);
            done();
        } catch (error) {
            done(error);
        }
    });

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

    it('test @spacl/core.Policy.prototype.query - wildcard path matching', function(done) {
        try {
            // Create a policy with wildcard path
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/*',
                verb: 'GET',
                conditions: []
            });
            
            const result1 = policy.query('/api/users', 'GET', {});
            const result2 = policy.query('/api/posts', 'GET', {});
            
            assert.strictEqual(result1.effect, 'allow');
            assert.strictEqual(result2.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.Policy.prototype.query - multiple