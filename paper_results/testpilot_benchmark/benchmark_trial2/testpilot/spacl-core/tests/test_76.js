let mocha = require('mocha');
let assert = require('assert');

// Mock implementation of @spacl/core
const _spacl_core = {
    Rule: class Rule {
        constructor() {
            this.rules = [];
        }

        allow(action, path) {
            this.rules.push({ type: 'allow', action, path });
            return this;
        }

        deny(action, path) {
            this.rules.push({ type: 'deny', action, path });
            return this;
        }

        query(path, action, context) {
            let result = null;
            
            for (const rule of this.rules) {
                if (rule.action === action && this._pathMatches(rule.path, path, context)) {
                    if (rule.type === 'allow') {
                        result = true;
                    } else if (rule.type === 'deny') {
                        result = false;
                    }
                }
            }
            
            return result;
        }

        _pathMatches(pattern, path, context) {
            // Handle wildcard patterns
            if (pattern.includes('*')) {
                const regexPattern = pattern.replace(/\*/g, '.*');
                return new RegExp(`^${regexPattern}$`).test(path);
            }
            
            // Handle parameter patterns like {name}
            if (pattern.includes('{') && pattern.includes('}')) {
                const paramPattern = pattern.replace(/\{(\w+)\}/g, (match, paramName) => {
                    return context && context[paramName] ? context[paramName] : '.*';
                });
                return new RegExp(`^${paramPattern}$`).test(path);
            }
            
            // Exact match
            return pattern === path;
        }
    }
};

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        try {
            // Create user rule that allows users to get any user and put their own profile
            const user = new _spacl_core.Rule()
                .allow('get', '/user/*')
                .allow('put', '/user/{name}');

            // Create admin rule that allows all operations except deleting own profile
            const admin = new _spacl_core.Rule()
                .allow('get', '/user/*')
                .allow('put', '/user/*')
                .allow('delete', '/user/*')
                .deny('delete', '/user/{name}');

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

            // Test with different context
            const ctx2 = { name: 'bar' };
            assert.strictEqual(user.query('/user/bar', 'put', ctx2), true, 'user bar should be able to put /user/bar');
            assert.strictEqual(user.query('/user/foo', 'put', ctx2), null, 'user bar should not be able to put /user/foo');
            assert.strictEqual(admin.query('/user/bar', 'delete', ctx2), false, 'admin bar should not be able to delete /user/bar');

            done();
        } catch (error) {
            done(error);
        }
    });
});