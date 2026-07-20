The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap', function(done) {
        // Mock policy objects for testing
        const mockPolicy1 = {
            name: 'policy1',
            query: function(path, verb, ctx) {
                if (path === '/allowed' && verb === 'read') return true;
                if (path === '/denied' && verb === 'write') return false;
                return null;
            },
            matches: function(path, ctx) {
                return path.startsWith('/allowed') || path.startsWith('/denied');
            }
        };

        const mockPolicy2 = {
            name: 'policy2',
            query: function(path, verb, ctx) {
                if (path === '/admin' && verb === 'delete') return true;
                return null;
            },
            matches: function(path, ctx) {
                return path.startsWith('/admin');
            }
        };

        // Test constructor with policies
        const policyMap = new _spacl_core.PolicyMap(mockPolicy1, mockPolicy2);
        
        // Test that policies are properly stored
        assert.strictEqual(policyMap.size, 2);
        assert.strictEqual(policyMap.get('policy1'), mockPolicy1);
        assert.strictEqual(policyMap.get('policy2'), mockPolicy2);

        // Test push method
        const mockPolicy3 = {
            name: 'policy3',
            query: function(path, verb, ctx) { return null; },
            matches: function(path, ctx) { return false; }
        };
        
        const result = policyMap.push(mockPolicy3);
        assert.strictEqual(result, policyMap); // Should return this for chaining
        assert.strictEqual(policyMap.size, 3);
        assert.strictEqual(policyMap.get('policy3'), mockPolicy3);

        // Test query method - existing policy with allowed action
        assert.strictEqual(policyMap.query('policy1', '/allowed', 'read'), true);
        
        // Test query method - existing policy with denied action
        assert.strictEqual(policyMap.query('policy1', '/denied', 'write'), false);
        
        // Test query method - existing policy with ungoverned action
        assert.strictEqual(policyMap.query('policy1', '/other', 'read'), null);
        
        // Test query method - non-existing policy
        assert.strictEqual(policyMap.query('nonexistent', '/path', 'verb'), null);

        // Test matches method - existing policy with matching path
        assert.strictEqual(policyMap.matches('policy1', '/allowed/subpath'), true);
        assert.strictEqual(policyMap.matches('policy2', '/admin/users'), true);
        
        // Test matches method - existing policy with non-matching path
        assert.strictEqual(policyMap.matches('policy1', '/other'), false);
        
        // Test matches method - non-existing policy
        assert.strictEqual(policyMap.matches('nonexistent', '/path'), false);

        // Test static for method
        const staticPolicyMap = _spacl_core.PolicyMap.for(mockPolicy1);
        assert.strictEqual(staticPolicyMap.size, 1);
        assert.strictEqual(staticPolicyMap.get('policy1'), mockPolicy1);
        assert(staticPolicyMap instanceof _spacl_core.PolicyMap);

        // Test empty constructor
        const emptyPolicyMap = new _spacl_core.PolicyMap();
        assert.strictEqual(emptyPolicyMap.size, 0);

        // Test push with multiple policies
        emptyPolicyMap.push(mockPolicy1, mockPolicy2);
        assert.strictEqual(emptyPolicyMap.size, 2);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_340.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_340.js:1:13)
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