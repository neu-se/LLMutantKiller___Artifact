The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Create mock rules for testing
        
        // User rule - allows own resource access for get/put, read-only for others
        const userRule = new _spacl_core.Rule();
        userRule.matches = function(path, ctx) {
            return path.startsWith('/user/');
        };
        userRule.verbs = {
            'get': true,
            'put': function(path, ctx) {
                // Users can only put to their own resource
                return path === `/user/${ctx.name}`;
            }
        };
        
        // Admin rule - full access except delete on own resource
        const adminRule = new _spacl_core.Rule();
        adminRule.matches = function(path, ctx) {
            return path.startsWith('/user/');
        };
        adminRule.verbs = {
            'get': true,
            'put': true,
            'delete': function(path, ctx) {
                // Admin cannot delete their own resource
                return path !== `/user/${ctx.name}`;
            }
        };
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user rule queries
        assert.strictEqual(userRule.query('/user/foo', 'get', ctx), true, 'User should be able to get own resource');
        assert.strictEqual(userRule.query('/user/foo', 'put', ctx), true, 'User should be able to put own resource');
        assert.strictEqual(userRule.query('/user/foo', 'delete', ctx), null, 'User delete should return null (verb not defined)');
        
        assert.strictEqual(userRule.query('/user/bar', 'get', ctx), true, 'User should be able to get other resources');
        assert.strictEqual(userRule.query('/user/bar', 'put', ctx), false, 'User should not be able to put other resources');
        assert.strictEqual(userRule.query('/user/bar', 'delete', ctx), null, 'User delete should return null (verb not defined)');
        
        // Test admin rule queries
        assert.strictEqual(adminRule.query('/user/foo', 'get', ctx), true, 'Admin should be able to get own resource');
        assert.strictEqual(adminRule.query('/user/foo', 'put', ctx), true, 'Admin should be able to put own resource');
        assert.strictEqual(adminRule.query('/user/foo', 'delete', ctx), false, 'Admin should not be able to delete own resource');
        
        assert.strictEqual(adminRule.query('/user/bar', 'get', ctx), true, 'Admin should be able to get other resources');
        assert.strictEqual(adminRule.query('/user/bar', 'put', ctx), true, 'Admin should be able to put other resources');
        assert.strictEqual(adminRule.query('/user/bar', 'delete', ctx), true, 'Admin should be able to delete other resources');
        
        // Test non-matching paths
        assert.strictEqual(userRule.query('/admin/foo', 'get', ctx), null, 'Non-matching path should return null');
        assert.strictEqual(adminRule.query('/admin/foo', 'get', ctx), null, 'Non-matching path should return null');
        
        // Test non-existent verbs
        assert.strictEqual(userRule.query('/user/foo', 'patch', ctx), null, 'Non-existent verb should return null');
        assert.strictEqual(adminRule.query('/user/foo', 'patch', ctx), null, 'Non-existent verb should return null');
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_128.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_128.js:1:13)
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