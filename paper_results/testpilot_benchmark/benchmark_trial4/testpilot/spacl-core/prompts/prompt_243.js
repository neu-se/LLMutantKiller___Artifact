The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Test 1: Query with existing policy that returns a result
        const policyMap1 = new _spacl_core.PolicyMap();
        const mockPolicy1 = {
            query: function(path, verb, ctx) {
                return { allowed: true, path: path, verb: verb };
            }
        };
        policyMap1.set('testPolicy1', mockPolicy1);
        
        const result1 = policyMap1.query('testPolicy1', '/api/users', 'GET', { user: 'admin' });
        assert.strictEqual(result1.allowed, true);
        assert.strictEqual(result1.path, '/api/users');
        assert.strictEqual(result1.verb, 'GET');

        // Test 2: Query with existing policy that returns null
        const policyMap2 = new _spacl_core.PolicyMap();
        const mockPolicy2 = {
            query: function(path, verb, ctx) {
                return null;
            }
        };
        policyMap2.set('testPolicy2', mockPolicy2);
        
        const result2 = policyMap2.query('testPolicy2', '/api/admin', 'DELETE', { user: 'guest' });
        assert.strictEqual(result2, null);

        // Test 3: Query with non-existing policy
        const policyMap3 = new _spacl_core.PolicyMap();
        const result3 = policyMap3.query('nonExistentPolicy', '/api/data', 'POST', { user: 'user' });
        assert.strictEqual(result3, null);

        // Test 4: Query with undefined policy name
        const policyMap4 = new _spacl_core.PolicyMap();
        const result4 = policyMap4.query(undefined, '/api/test', 'PUT', {});
        assert.strictEqual(result4, null);

        // Test 5: Verify policy.query is called with correct parameters
        const policyMap5 = new _spacl_core.PolicyMap();
        let capturedArgs = null;
        const mockPolicy5 = {
            query: function(path, verb, ctx) {
                capturedArgs = { path: path, verb: verb, ctx: ctx };
                return { success: true };
            }
        };
        policyMap5.set('trackingPolicy', mockPolicy5);
        
        const testCtx = { userId: 123, role: 'editor' };
        policyMap5.query('trackingPolicy', '/api/edit', 'PATCH', testCtx);
        
        assert.strictEqual(capturedArgs.path, '/api/edit');
        assert.strictEqual(capturedArgs.verb, 'PATCH');
        assert.deepStrictEqual(capturedArgs.ctx, testCtx);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_377.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_377.js:1:13)
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