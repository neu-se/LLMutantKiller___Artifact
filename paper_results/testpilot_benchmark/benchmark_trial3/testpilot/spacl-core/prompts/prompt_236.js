The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push', function(done) {
        try {
            // Test 1: Push single policy to empty PolicyMap
            const policyMap = new _spacl_core.PolicyMap();
            const policy1 = new _spacl_core.Policy('user');
            
            const result = policyMap.push(policy1);
            
            // Should return the PolicyMap instance for chaining
            assert.strictEqual(result, policyMap);
            
            // Should contain the pushed policy
            assert.strictEqual(policyMap.get('user'), policy1);
            assert.strictEqual(policyMap.size, 1);
            
            // Test 2: Push multiple policies at once
            const policy2 = new _spacl_core.Policy('admin');
            const policy3 = new _spacl_core.Policy('guest');
            
            policyMap.push(policy2, policy3);
            
            // Should contain all three policies
            assert.strictEqual(policyMap.get('admin'), policy2);
            assert.strictEqual(policyMap.get('guest'), policy3);
            assert.strictEqual(policyMap.size, 3);
            
            // Test 3: Push policy with same name should overwrite
            const newUserPolicy = new _spacl_core.Policy('user');
            policyMap.push(newUserPolicy);
            
            // Should overwrite the original user policy
            assert.strictEqual(policyMap.get('user'), newUserPolicy);
            assert.notStrictEqual(policyMap.get('user'), policy1);
            assert.strictEqual(policyMap.size, 3); // Size should remain the same
            
            // Test 4: Push no policies should not change the map
            const sizeBefore = policyMap.size;
            policyMap.push();
            assert.strictEqual(policyMap.size, sizeBefore);
            
            // Test 5: Method chaining should work
            const policy4 = new _spacl_core.Policy('moderator');
            const policy5 = new _spacl_core.Policy('viewer');
            
            const chainResult = policyMap.push(policy4).push(policy5);
            assert.strictEqual(chainResult, policyMap);
            assert.strictEqual(policyMap.get('moderator'), policy4);
            assert.strictEqual(policyMap.get('viewer'), policy5);
            assert.strictEqual(policyMap.size, 5);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_371.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_371.js:1:13)
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