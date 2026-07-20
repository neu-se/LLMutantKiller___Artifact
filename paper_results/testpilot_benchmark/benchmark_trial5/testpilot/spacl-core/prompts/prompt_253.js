The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Test 1: Query existing policy that returns a result
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create a mock policy object
        const mockPolicy = {
            query: function(path, verb, ctx) {
                if (path === '/test' && verb === 'GET') {
                    return { allowed: true, reason: 'test policy' };
                }
                return { allowed: false, reason: 'denied' };
            }
        };
        
        // Add the mock policy to the map
        policyMap.set('testPolicy', mockPolicy);
        
        // Test querying existing policy with matching conditions
        const result1 = policyMap.query('testPolicy', '/test', 'GET', {});
        assert.strictEqual(result1.allowed, true);
        assert.strictEqual(result1.reason, 'test policy');
        
        // Test querying existing policy with non-matching conditions
        const result2 = policyMap.query('testPolicy', '/other', 'POST', {});
        assert.strictEqual(result2.allowed, false);
        assert.strictEqual(result2.reason, 'denied');
        
        // Test 2: Query non-existing policy
        const result3 = policyMap.query('nonExistentPolicy', '/test', 'GET', {});
        assert.strictEqual(result3, null);
        
        // Test 3: Query with undefined policy name
        const result4 = policyMap.query(undefined, '/test', 'GET', {});
        assert.strictEqual(result4, null);
        
        // Test 4: Query with null policy name
        const result5 = policyMap.query(null, '/test', 'GET', {});
        assert.strictEqual(result5, null);
        
        // Test 5: Query with context parameter
        const mockPolicyWithContext = {
            query: function(path, verb, ctx) {
                if (ctx && ctx.user === 'admin') {
                    return { allowed: true, reason: 'admin access' };
                }
                return { allowed: false, reason: 'insufficient privileges' };
            }
        };
        
        policyMap.set('contextPolicy', mockPolicyWithContext);
        
        const result6 = policyMap.query('contextPolicy', '/admin', 'GET', { user: 'admin' });
        assert.strictEqual(result6.allowed, true);
        assert.strictEqual(result6.reason, 'admin access');
        
        const result7 = policyMap.query('contextPolicy', '/admin', 'GET', { user: 'guest' });
        assert.strictEqual(result7.allowed, false);
        assert.strictEqual(result7.reason, 'insufficient privileges');
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_395.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_395.js:1:13)
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