The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Create mock rule objects for testing
        const userRule = new _spacl_core.Rule();
        const adminRule = new _spacl_core.Rule();
        
        // Mock the matches method and verbs for userRule
        userRule.matches = function(path, ctx) {
            if (path === '/user/foo' && ctx.name === 'foo') return true;
            if (path === '/user/bar' && ctx.name === 'foo') return true;
            return false;
        };
        userRule.verbs = {
            'get': true,
            'put': true
            // 'delete' is intentionally missing to test null return
        };
        
        // Mock the matches method and verbs for adminRule
        adminRule.matches = function(path, ctx) {
            return true; // Admin matches all paths
        };
        adminRule.verbs = {
            'get': true,
            'put': true,
            'delete': false // Explicitly denied for /user/foo, but will be true for others
        };
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test userRule queries
        assert.strictEqual(userRule.query('/user/foo', 'get', ctx), true, 'User should be able to GET /user/foo');
        assert.strictEqual(userRule.query('/user/foo', 'put', ctx), true, 'User should be able to PUT /user/foo');
        assert.strictEqual(userRule.query('/user/foo', 'delete', ctx), null, 'User DELETE /user/foo should return null (implicit denial)');
        assert.strictEqual(userRule.query('/user/bar', 'get', ctx), true, 'User should be able to GET /user/bar');
        assert.strictEqual(userRule.query('/user/bar', 'put', ctx), true, 'User should be able to PUT /user/bar');
        assert.strictEqual(userRule.query('/user/bar', 'delete', ctx), null, 'User DELETE /user/bar should return null (implicit denial)');
        
        // Test adminRule queries
        assert.strictEqual(adminRule.query('/user/foo', 'get', ctx), true, 'Admin should be able to GET /user/foo');
        assert.strictEqual(adminRule.query('/user/foo', 'put', ctx), true, 'Admin should be able to PUT /user/foo');
        assert.strictEqual(adminRule.query('/user/foo', 'delete', ctx), false, 'Admin DELETE /user/foo should be explicitly denied');
        assert.strictEqual(adminRule.query('/user/bar', 'get', ctx), true, 'Admin should be able to GET /user/bar');
        assert.strictEqual(adminRule.query('/user/bar', 'put', ctx), true, 'Admin should be able to PUT /user/bar');
        
        // Create a special admin rule for /user/bar to test true delete permission
        const adminBarRule = new _spacl_core.Rule();
        adminBarRule.matches = function(path, ctx) {
            return path === '/user/bar';
        };
        adminBarRule.verbs = {
            'get': true,
            'put': true,
            'delete': true
        };
        assert.strictEqual(adminBarRule.query('/user/bar', 'delete', ctx), true, 'Admin should be able to DELETE /user/bar');
        
        // Test non-matching path
        assert.strictEqual(userRule.query('/admin/settings', 'get', ctx), null, 'Non-matching path should return null');
        
        // Test non-existent verb
        assert.strictEqual(userRule.query('/user/foo', 'patch', ctx), null, 'Non-existent verb should return null');
        
        // Test with different context that doesn't match
        const otherCtx = { name: 'bar' };
        assert.strictEqual(userRule.query('/user/foo', 'get', otherCtx), null, 'Non-matching context should return null');
        
        done();
    });
});
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'match')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.