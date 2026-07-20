let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
        // Create mock rules for testing
        const mockUserRules = [
            {
                query: function(path, verb, ctx) {
                    // Allow user to get/put their own resource
                    if (path === `/user/${ctx.name}` && (verb === 'get' || verb === 'put')) {
                        return true;
                    }
                    // Allow user to get other users (read-only)
                    if (path.startsWith('/user/') && verb === 'get') {
                        return true;
                    }
                    // No explicit allow or deny for other cases
                    return null;
                }
            }
        ];

        const mockAdminRules = [
            {
                query: function(path, verb, ctx) {
                    // Explicitly deny delete on own resource
                    if (path === `/user/${ctx.name}` && verb === 'delete') {
                        return false;
                    }
                    // Allow all other operations on user resources
                    if (path.startsWith('/user/')) {
                        return true;
                    }
                    return null;
                }
            }
        ];

        // Create policy instances
        const userPolicy = new _spacl_core.Policy();
        userPolicy.rules = mockUserRules;

        const adminPolicy = new _spacl_core.Policy();
        adminPolicy.rules = mockAdminRules;

        // Test context
        const ctx = { name: 'foo' };

        // Test user policy
        assert.strictEqual(userPolicy.query('/user/foo', 'get', ctx), true, 'User should be able to get own resource');
        assert.strictEqual(userPolicy.query('/user/foo', 'put', ctx), true, 'User should be able to put own resource');
        assert.strictEqual(userPolicy.query('/user/foo', 'delete', ctx), null, 'User delete should be implicitly denied');
        assert.strictEqual(userPolicy.query('/user/bar', 'get', ctx), true, 'User should be able to get other user resource');
        assert.strictEqual(userPolicy.query('/user/bar', 'put', ctx), null, 'User put on other resource should be implicitly denied');
        assert.strictEqual(userPolicy.query('/user/bar', 'delete', ctx), null, 'User delete on other resource should be implicitly denied');

        // Test admin policy
        assert.strictEqual(adminPolicy.query('/user/foo', 'get', ctx), true, 'Admin should be able to get own resource');
        assert.strictEqual(adminPolicy.query('/user/foo', 'put', ctx), true, 'Admin should be able to put own resource');
        assert.strictEqual(adminPolicy.query('/user/foo', 'delete', ctx), false, 'Admin delete on own resource should be explicitly denied');
        assert.strictEqual(adminPolicy.query('/user/bar', 'get', ctx), true, 'Admin should be able to get other user resource');
        assert.strictEqual(adminPolicy.query('/user/bar', 'put', ctx), true, 'Admin should be able to put other user resource');
        assert.strictEqual(adminPolicy.query('/user/bar', 'delete', ctx), true, 'Admin should be able to delete other user resource');

        // Test edge case: policy with no rules
        const emptyPolicy = new _spacl_core.Policy();
        emptyPolicy.rules = [];
        assert.strictEqual(emptyPolicy.query('/any/path', 'get', ctx), null, 'Empty policy should return null');

        // Test multiple rules with mixed results
        const mixedPolicy = new _spacl_core.Policy();
        mixedPolicy.rules = [
            {
                query: function(path, verb, ctx) {
                    if (path === '/test' && verb === 'get') return true;
                    return null;
                }
            },
            {
                query: function(path, verb, ctx) {
                    if (path === '/test' && verb === 'post') return false;
                    return null;
                }
            }
        ];

        assert.strictEqual(mixedPolicy.query('/test', 'get', ctx), true, 'Should return true when one rule allows');
        assert.strictEqual(mixedPolicy.query('/test', 'post', ctx), false, 'Should return false when one rule denies');
        assert.strictEqual(mixedPolicy.query('/test', 'put', ctx), null, 'Should return null when no rule matches');

        done();
    });
});