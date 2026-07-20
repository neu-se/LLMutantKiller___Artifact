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
        
        // Test 5: Test with different context and path
        let rule3 = new _spacl_core.Rule();
        rule3.matches = function(path, ctx) { return path === '/admin' && ctx.user === 'admin'; };
        rule3.verbs = { 'PUT': 'conditional' };
        
        let result5 = rule3.query('/admin', 'PUT', { user: 'admin' });
        assert.strictEqual(result5, 'conditional', 'Should return verb value when complex matching conditions are met');
        
        let result6 = rule3.query('/admin', 'PUT', { user: 'guest' });
        assert.strictEqual(result6, null, 'Should return null when complex matching conditions are not met');
        
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