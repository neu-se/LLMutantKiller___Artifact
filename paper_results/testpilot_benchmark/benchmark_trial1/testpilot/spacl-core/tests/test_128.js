```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Create PolicyMap instances for user and admin roles
        const user = new _spacl_core.PolicyMap();
        const admin = new _spacl_core.PolicyMap();
        
        // Setup user policy - can read/write own data, read others
        user.addPolicy('/user/{name}', 'get', true);
        user.addPolicy('/user/{name}', 'put', function(ctx) {
            return ctx.name === this.name;
        });
        user.addPolicy('/user/*', 'get', true);
        
        // Setup admin policy - can do everything except delete own account
        admin.addPolicy('/user/*', 'get', true);
        admin.addPolicy('/user/*', 'put', true);
        admin.addPolicy('/user/*', 'delete', true);
        admin.addPolicy('/user/{name}', 'delete', function(ctx) {
            return ctx.name !== this.name;
        });
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user permissions
        assert.strictEqual(user.query('user', '/user/foo', 'get', ctx), true, 'user should be able to get own data');
        assert.strictEqual(user.query('user', '/user/foo', 'put', ctx), true, 'user should be able to put own data');
        assert.strictEqual(user.query('user', '/user/foo', 'delete', ctx), null, 'user delete should be implicitly denied');
        assert.strictEqual(user.query('user', '/user/bar', 'get', ctx), true, 'user should be able to get other user data');
        assert.strictEqual(user.query('user', '/user/bar', 'put', ctx), null, 'user put on other user should be implicitly denied');
        assert.strictEqual(user.query('user', '/user/bar', 'delete', ctx), null, 'user delete on other user should be implicitly denied');
        
        // Test admin permissions
        assert.strictEqual(admin.query('admin', '/user/foo', 'get', ctx), true, 'admin should be able to get user data');
        assert.strictEqual(admin.query('admin', '/user/foo', 'put', ctx), true, 'admin should be able to put user data');
        assert.strictEqual(admin.query('admin', '/user/foo', 'delete', ctx), false, 'admin should not be able to delete own account');
        assert.strictEqual(admin.query('admin', '/user/bar', 'get', ctx), true, 'admin should be able to get other user data');
        assert.strictEqual(admin.query('admin', '/user/bar', 'put', ctx), true, 'admin should be able to put other user data');
        assert.strictEqual(admin.query('admin', '/user/bar', 'delete', ctx), true, 'admin should be able to delete other user accounts');
        
        done();
    });
    
    it('test query with different contexts', function(done) {
        const policy = new _spacl_core.PolicyMap();
        
        // Setup a policy that depends on context
        policy.addPolicy('/resource/{id}', 'access', function(ctx) {
            return ctx.userId === this.id;
        });
        
        // Test with matching context
        const matchingCtx = { userId: '123' };
        assert.strictEqual(policy.query('test', '/resource/123', 'access', matchingCtx), true, 'should allow access when context matches');
        
        // Test with non-matching context
        const nonMatchingCtx = { userId: '456' };
        assert.strictEqual(policy.query('test', '/resource/123', 'access', nonMatchingCtx), false, 'should deny access when