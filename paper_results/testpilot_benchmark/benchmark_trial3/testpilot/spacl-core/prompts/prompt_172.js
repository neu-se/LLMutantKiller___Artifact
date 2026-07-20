The test:
```
let mocha = require('mocha');
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
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_272.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_272.js:1:13)
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