let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        try {
            // Create user rule that allows limited access
            const user = new _spacl_core.Rule();
            user.allow('/user/:name', 'get', (ctx) => true);
            user.allow('/user/:name', 'put', (ctx, params) => ctx.name === params.name);
            
            // Create admin rule that allows broader access but denies delete on own user
            const admin = new _spacl_core.Rule();
            admin.allow('/user/:name', 'get', (ctx) => true);
            admin.allow('/user/:name', 'put', (ctx) => true);
            admin.allow('/user/:name', 'delete', (ctx, params) => ctx.name !== params.name);
            admin.deny('/user/:name', 'delete', (ctx, params) => ctx.name === params.name);
            
            // Test context
            const ctx = { name: 'foo' };
            
            // Test user rule queries
            assert.strictEqual(user.query('/user/foo', 'get', ctx), true, 'user should be able to get /user/foo');
            assert.strictEqual(user.query('/user/foo', 'put', ctx), true, 'user should be able to put /user/foo');
            assert.strictEqual(user.query('/user/foo', 'delete', ctx), null, 'user delete /user/foo should be implicitly denied');
            assert.strictEqual(user.query('/user/bar', 'get', ctx), true, 'user should be able to get /user/bar');
            assert.strictEqual(user.query('/user/bar', 'put', ctx), null, 'user put /user/bar should be implicitly denied');
            assert.strictEqual(user.query('/user/bar', 'delete', ctx), null, 'user delete /user/bar should be implicitly denied');
            
            // Test admin rule queries
            assert.strictEqual(admin.query('/user/foo', 'get', ctx), true, 'admin should be able to get /user/foo');
            assert.strictEqual(admin.query('/user/foo', 'put', ctx), true, 'admin should be able to put /user/foo');
            assert.strictEqual(admin.query('/user/foo', 'delete', ctx), false, 'admin delete /user/foo should be explicitly denied');
            assert.strictEqual(admin.query('/user/bar', 'get', ctx), true, 'admin should be able to get /user/bar');
            assert.strictEqual(admin.query('/user/bar', 'put', ctx), true, 'admin should be able to put /user/bar');
            assert.strictEqual(admin.query('/user/bar', 'delete', ctx), true, 'admin should be able to delete /user/bar');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});