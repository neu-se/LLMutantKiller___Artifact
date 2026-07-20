The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches', function(done) {
        // Create a mock policy object
        const mockPolicy = {
            matches: function(path, ctx) {
                // Simple mock implementation - returns true if path starts with '/allowed'
                return path.startsWith('/allowed');
            }
        };

        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Mock the get method to return our mock policy for 'testPolicy'
        policyMap.get = function(name) {
            if (name === 'testPolicy') {
                return mockPolicy;
            }
            return undefined;
        };

        // Test case 1: Policy exists and matches
        const result1 = policyMap.matches('testPolicy', '/allowed/resource', {});
        assert.strictEqual(result1, true, 'Should return true when policy exists and matches');

        // Test case 2: Policy exists but doesn't match
        const result2 = policyMap.matches('testPolicy', '/denied/resource', {});
        assert.strictEqual(result2, false, 'Should return false when policy exists but doesn\'t match');

        // Test case 3: Policy doesn't exist
        const result3 = policyMap.matches('nonExistentPolicy', '/any/path', {});
        assert.strictEqual(result3, false, 'Should return false when policy doesn\'t exist');

        done();
    });

    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_410.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_410.js:1:13)
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