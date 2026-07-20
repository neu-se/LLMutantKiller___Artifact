let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Create PolicyMap instances for user and admin roles
        const user = new _spacl_core.PolicyMap();
        const admin = new _spacl_core.PolicyMap();
        
        // Setup user policies - can read/write own data, read others
        user.addPolicy('/user/{name}', 'get', true);
        user.addPolicy('/user/{name}', 'put', function(ctx) {
            return ctx.name === this.name;
        });
        user.addPolicy('/user/*', 'get', true);
        
        // Setup admin policies - full access except delete own account
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
        assert.strictEqual(admin.query('admin', '/user/foo', 'delete', ctx), false, 'admin should be explicitly denied from deleting own account');
        assert.strictEqual(admin.query('admin', '/user/bar', 'get', ctx), true, 'admin should be able to get other user data');
        assert.strictEqual(admin.query('admin', '/user/bar', 'put', ctx), true, 'admin should be able to put other user data');
        assert.strictEqual(admin.query('admin', '/user/bar', 'delete', ctx), true, 'admin should be able to delete other user data');
        
        done();
    });
});