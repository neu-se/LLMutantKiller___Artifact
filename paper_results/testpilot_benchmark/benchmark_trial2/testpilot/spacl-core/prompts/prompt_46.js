The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Test 1: Rule matches path and verb exists - should return verb value
        let rule1 = new _spacl_core.Rule();
        rule1.matches = function(path, ctx) { return true; };
        rule1.verbs = { 'GET': 'allow', 'POST': 'deny' };
        
        let result1 = rule1.query('/api/users', 'GET', {});
        assert.strictEqual(result1, 'allow', 'Should return verb value when rule matches and verb exists');
        
        // Test 2: Rule matches path but verb doesn't exist - should return null
        let result2 = rule1.query('/api/users', 'DELETE', {});
        assert.strictEqual(result2, null, 'Should return null when rule matches but verb does not exist');
        
        // Test 3: Rule doesn't match path - should return null regardless of verb
        let rule2 = new _spacl_core.Rule();
        rule2.matches = function(path, ctx) { return false; };
        rule2.verbs = { 'GET': 'allow', 'POST': 'deny' };
        
        let result3 = rule2.query('/api/users', 'GET', {});
        assert.strictEqual(result3, null, 'Should return null when rule does not match path');
        
        // Test 4: Rule doesn't match and verb doesn't exist - should return null
        let result4 = rule2.query('/api/users', 'DELETE', {});
        assert.strictEqual(result4, null, 'Should return null when rule does not match and verb does not exist');
        
        // Test 5: Test with different verb values
        let rule3 = new _spacl_core.Rule();
        rule3.matches = function(path, ctx) { return true; };
        rule3.verbs = { 'PUT': 'conditional', 'PATCH': 42 };
        
        let result5 = rule3.query('/api/resource', 'PUT', {});
        assert.strictEqual(result5, 'conditional', 'Should return correct verb value for PUT');
        
        let result6 = rule3.query('/api/resource', 'PATCH', {});
        assert.strictEqual(result6, 42, 'Should return correct verb value for PATCH');
        
        // Test 6: Test with context parameter
        let rule4 = new _spacl_core.Rule();
        rule4.matches = function(path, ctx) { return ctx && ctx.user === 'admin'; };
        rule4.verbs = { 'DELETE': 'allow' };
        
        let result7 = rule4.query('/admin/delete', 'DELETE', { user: 'admin' });
        assert.strictEqual(result7, 'allow', 'Should return verb value when context matches');
        
        let result8 = rule4.query('/admin/delete', 'DELETE', { user: 'guest' });
        assert.strictEqual(result8, null, 'Should return null when context does not match');
        
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