Looking at the examples, I can see that the `query` method returns:
- `true` for explicitly allowed actions
- `false` for explicitly denied actions  
- `null` for implicitly denied actions (no rule defined)

The examples show two policy types (`user` and `admin`) with different permission sets. I'll need to create these policies and test the query method with various path/verb/context combinations.

```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
        try {
            // Create user policy with limited permissions
            const userPolicy = new _spacl_core.Policy();
            
            // User can get/put their own data, get others' data
            userPolicy.allow('/user/:name', 'get', (ctx) => true);
            userPolicy.allow('/user/:name', 'put', (ctx, params) => ctx.name === params.name);
            
            // Create admin policy with broader permissions
            const adminPolicy = new _spacl_core.Policy();
            
            // Admin can get/put any user data, but cannot delete their own account
            adminPolicy.allow('/user/:name', 'get', (ctx) => true);
            adminPolicy.allow('/user/:name', 'put', (ctx) => true);
            adminPolicy.allow('/user/:name', 'delete', (ctx, params) => ctx.name !== params.name);
            adminPolicy.deny('/user/:name', 'delete', (ctx, params) => ctx.name === params.name);
            
            // Test context
            const ctx = { name: 'foo' };
            
            // Test user policy
            assert.strictEqual(userPolicy.query('/user/foo', 'get', ctx), true, 'user should be able to get own data');
            assert.strictEqual(userPolicy.query('/user/foo', 'put', ctx), true, 'user should be able to put own data');
            assert.strictEqual(userPolicy.query('/user/foo', 'delete', ctx), null, 'user delete own should be implicitly denied');
            assert.strictEqual(userPolicy.query('/user/bar', 'get', ctx), true, 'user should be able to get others data');
            assert.strictEqual(userPolicy.query('/user/bar', 'put', ctx), null, 'user put others should be implicitly denied');
            assert.strictEqual(userPolicy.query('/user/bar', 'delete', ctx), null, 'user delete others should be implicitly denied');
            
            // Test admin policy
            assert.strictEqual(adminPolicy.query('/user/foo', 'get', ctx), true, 'admin should be able to get own data');
            assert.strictEqual(adminPolicy.query('/user/foo', 'put', ctx), true, 'admin should be able to put own data');
            assert.strictEqual(adminPolicy.query('/user/foo', 'delete', ctx), false, 'admin delete own should be explicitly denied');
            assert.strictEqual(adminPolicy.query('/user/bar', 'get', ctx), true, 'admin should be able to get others data');
            assert.strictEqual(adminPolicy.query('/user/bar', 'put', ctx), true, 'admin should be able to put others data');
            assert.strictEqual(adminPolicy.query('/user/bar', 'delete', ctx), true, 'admin should be able to delete others data');
            
            // Test with different context
            const ctx2 = { name: 'bar' };
            assert.strictEqual(userPolicy.query('/user/bar', 'put', ctx2), true, 'user bar should be able to put own data');
            assert.strictEqual(userPolicy.query('/user/foo', 'put', ctx2), null, 'user bar should not be able to put foo data');
            assert.strictEqual(adminPolicy.query('/user/bar', 'delete', ctx2), false, 'admin bar should not be able to delete own data');
            
            done