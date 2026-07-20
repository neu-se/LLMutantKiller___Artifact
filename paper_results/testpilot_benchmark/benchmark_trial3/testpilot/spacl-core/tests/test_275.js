let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
        try {
            // Create user policy - allows get/put on own resources, get on others
            const userPolicy = new _spacl_core.Policy();
            userPolicy.allow('/user/{name}', 'get', (ctx) => true);
            userPolicy.allow('/user/{name}', 'put', (ctx, params) => ctx.name === params.name);
            userPolicy.allow('/user/*', 'get', (ctx) => true);

            // Create admin policy - allows everything except delete on own resources
            const adminPolicy = new _spacl_core.Policy();
            adminPolicy.allow('/user/*', 'get', (ctx) => true);
            adminPolicy.allow('/user/*', 'put', (ctx) => true);
            adminPolicy.allow('/user/{name}', 'delete', (ctx, params) => ctx.name !== params.name);
            adminPolicy.deny('/user/{name}', 'delete', (ctx, params) => ctx.name === params.name);

            // Test context
            const ctx = { name: 'foo' };

            // Test user policy
            assert.strictEqual(userPolicy.query('/user/foo', 'get', ctx), true, 'user should be able to get own resource');
            assert.strictEqual(userPolicy.query('/user/foo', 'put', ctx), true, 'user should be able to put own resource');
            assert.strictEqual(userPolicy.query('/user/foo', 'delete', ctx), null, 'user delete on own resource should be implicitly denied');
            assert.strictEqual(userPolicy.query('/user/bar', 'get', ctx), true, 'user should be able to get other resources');
            assert.strictEqual(userPolicy.query('/user/bar', 'put', ctx), null, 'user put on other resource should be implicitly denied');
            assert.strictEqual(userPolicy.query('/user/bar', 'delete', ctx), null, 'user delete on other resource should be implicitly denied');

            // Test admin policy
            assert.strictEqual(adminPolicy.query('/user/foo', 'get', ctx), true, 'admin should be able to get own resource');
            assert.strictEqual(adminPolicy.query('/user/foo', 'put', ctx), true, 'admin should be able to put own resource');
            assert.strictEqual(adminPolicy.query('/user/foo', 'delete', ctx), false, 'admin delete on own resource should be explicitly denied');
            assert.strictEqual(adminPolicy.query('/user/bar', 'get', ctx), true, 'admin should be able to get other resources');
            assert.strictEqual(adminPolicy.query('/user/bar', 'put', ctx), true, 'admin should be able to put other resources');
            assert.strictEqual(adminPolicy.query('/user/bar', 'delete', ctx), true, 'admin should be able to delete other resources');

            // Test edge cases
            assert.strictEqual(userPolicy.query('/nonexistent', 'get', ctx), null, 'query on non-matching path should return null');
            assert.strictEqual(adminPolicy.query('/user/foo', 'patch', ctx), null, 'query with non-configured verb should return null');

            done();
        } catch (error) {
            done(error);
        }
    });
});