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
        rule3.matches = function(path, ctx) { 
            return path === '/admin' && ctx.user === 'admin'; 
        };
        rule3.verbs = { 'PUT': 'conditional' };
        
        let result5 = rule3.query('/admin', 'PUT', { user: 'admin' });
        assert.strictEqual(result5, 'conditional', 'Should return verb value with matching path and context');
        
        let result6 = rule3.query('/admin', 'PUT', { user: 'guest' });
        assert.strictEqual(result6, null, 'Should return null when context does not match');
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_112.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_112.js:1:13)
    at Module._compile (node:internal/modules/cjs/loader:1480:14)
    at Module.replacementCompile (/Users/anon/testpilot2/node_modules/append-transform/index.js:60:13)
    at Module._extensions..js (node:internal/modules/cjs/loader:1564:10)
    at Object.<anonymous> (/Users/anon/testpilot2/node_modules/append-transform/index.js:64:4)
    at Module.load (node:internal/modules/cjs/loader:1287:32)
    at Module._load (node:internal/modules/cjs/loader:1103:12)
    at cjsLoader (node:internal/modules/esm/translators:318:15)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:258:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:474:24)
    at async formattedImport (/Users/anon/testpilot2/node_modules/mocha/lib/nodejs/esm-utils.js:7:14)
    at async exports.requireOrImport (/Users/anon/testpilot2/node_modules/mocha/lib/nodejs/esm-utils.js:38:28)
    at async exports.loadFilesAsync (/Users/anon/testpilot2/node_modules/mocha/lib/nodejs/esm-utils.js:91:20)
    at async singleRun (/Users/anon/testpilot2/node_modules/mocha/lib/cli/run-helpers.js:125:3)
    at async exports.handler (/Users/anon/testpilot2/node_modules/mocha/lib/cli/run.js:370:5)
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.