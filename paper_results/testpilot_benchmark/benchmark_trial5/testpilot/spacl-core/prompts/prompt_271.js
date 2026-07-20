The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches', function(done) {
        try {
            // Create a PolicyMap instance
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test 1: Empty policy map should not match anything
            let result1 = policyMap.matches('testPolicy', '/test/path', {});
            assert.strictEqual(result1, false, 'Empty policy map should not match');
            
            // Test 2: Add a simple policy and test matching
            policyMap.add('testPolicy', '/test/*', { action: 'allow' });
            let result2 = policyMap.matches('testPolicy', '/test/path', {});
            assert.strictEqual(result2, true, 'Should match wildcard path');
            
            // Test 3: Test non-matching path
            let result3 = policyMap.matches('testPolicy', '/other/path', {});
            assert.strictEqual(result3, false, 'Should not match different path');
            
            // Test 4: Test non-existing policy name
            let result4 = policyMap.matches('nonExistentPolicy', '/test/path', {});
            assert.strictEqual(result4, false, 'Should not match non-existent policy');
            
            // Test 5: Test exact path match
            policyMap.add('exactPolicy', '/exact/path', { action: 'deny' });
            let result5 = policyMap.matches('exactPolicy', '/exact/path', {});
            assert.strictEqual(result5, true, 'Should match exact path');
            
            // Test 6: Test with context
            policyMap.add('contextPolicy', '/api/*', { action: 'allow', role: 'admin' });
            let result6 = policyMap.matches('contextPolicy', '/api/users', { role: 'admin' });
            assert.strictEqual(result6, true, 'Should match with context');
            
            // Test 7: Test with non-matching context
            let result7 = policyMap.matches('contextPolicy', '/api/users', { role: 'user' });
            assert.strictEqual(result7, false, 'Should not match with wrong context');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_407.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_407.js:1:13)
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