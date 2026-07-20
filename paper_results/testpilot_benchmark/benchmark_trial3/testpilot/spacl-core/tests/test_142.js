let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches', function(done) {
        // Test 1: Basic regex match without props
        const rule1 = new _spacl_core.Rule();
        rule1.regex = /^\/api\/users$/;
        rule1.regex.props = [];
        
        assert.strictEqual(rule1.matches('/api/users', {}), true);
        assert.strictEqual(rule1.matches('/api/posts', {}), false);
        assert.strictEqual(rule1.matches('/api/users/123', {}), false);

        // Test 2: Regex with capture groups and props
        const rule2 = new _spacl_core.Rule();
        rule2.regex = /^\/api\/users\/([^\/]+)$/;
        rule2.regex.props = ['userId'];
        
        const ctx1 = { userId: '123' };
        const ctx2 = { userId: '456' };
        const ctx3 = { userId: '123', other: 'value' };
        
        assert.strictEqual(rule2.matches('/api/users/123', ctx1), true);
        assert.strictEqual(rule2.matches('/api/users/456', ctx2), true);
        assert.strictEqual(rule2.matches('/api/users/123', ctx3), true);
        assert.strictEqual(rule2.matches('/api/users/456', ctx1), false);
        assert.strictEqual(rule2.matches('/api/users/123', ctx2), false);

        // Test 3: Multiple capture groups and props
        const rule3 = new _spacl_core.Rule();
        rule3.regex = /^\/api\/users\/([^\/]+)\/posts\/([^\/]+)$/;
        rule3.regex.props = ['userId', 'postId'];
        
        const ctx4 = { userId: '123', postId: '456' };
        const ctx5 = { userId: '123', postId: '789' };
        
        assert.strictEqual(rule3.matches('/api/users/123/posts/456', ctx4), true);
        assert.strictEqual(rule3.matches('/api/users/123/posts/789', ctx5), true);
        assert.strictEqual(rule3.matches('/api/users/123/posts/456', ctx5), false);

        // Test 4: Missing context when props are required
        const rule4 = new _spacl_core.Rule();
        rule4.regex = /^\/api\/users\/([^\/]+)$/;
        rule4.regex.props = ['userId'];
        
        assert.strictEqual(rule4.matches('/api/users/123', undefined), false);
        assert.strictEqual(rule4.matches('/api/users/123'), false);

        // Test 5: Missing property in context
        const rule5 = new _spacl_core.Rule();
        rule5.regex = /^\/api\/users\/([^\/]+)$/;
        rule5.regex.props = ['userId'];
        
        const ctx6 = { otherProp: '123' };
        const ctx7 = {};
        
        assert.strictEqual(rule5.matches('/api/users/123', ctx6), false);
        assert.strictEqual(rule5.matches('/api/users/123', ctx7), false);

        // Test 6: No match with regex
        const rule6 = new _spacl_core.Rule();
        rule6.regex = /^\/api\/users$/;
        rule6.regex.props = [];
        
        assert.strictEqual(rule6.matches('/completely/different/path', {}), false);
        assert.strictEqual(rule6.matches('', {}), false);

        done();
    });
});