The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny', function(done) {
        // Test 1: Deny a single verb
        let rule1 = new _spacl_core.Rule();
        rule1.deny('read');
        assert.strictEqual(rule1.verbs['read'], false, 'Single verb should be denied');
        
        // Test 2: Deny multiple verbs
        let rule2 = new _spacl_core.Rule();
        rule2.deny('read', 'write', 'delete');
        assert.strictEqual(rule2.verbs['read'], false, 'Read verb should be denied');
        assert.strictEqual(rule2.verbs['write'], false, 'Write verb should be denied');
        assert.strictEqual(rule2.verbs['delete'], false, 'Delete verb should be denied');
        
        // Test 3: Method chaining
        let rule3 = new _spacl_core.Rule();
        let result = rule3.deny('execute');
        assert.strictEqual(result, rule3, 'deny() should return the rule instance for chaining');
        assert.strictEqual(rule3.verbs['execute'], false, 'Execute verb should be denied');
        
        // Test 4: Deny no verbs (empty arguments)
        let rule4 = new _spacl_core.Rule();
        rule4.deny();
        // Should not throw an error and verbs object should remain unchanged
        assert.ok(rule4.verbs, 'Verbs object should still exist');
        
        // Test 5: Overwrite existing verb permissions
        let rule5 = new _spacl_core.Rule();
        // Assume verbs might be initially undefined or have different values
        rule5.verbs = rule5.verbs || {};
        rule5.verbs['update'] = true; // Set to true first
        rule5.deny('update');
        assert.strictEqual(rule5.verbs['update'], false, 'Previously allowed verb should now be denied');
        
        // Test 6: Deny duplicate verbs
        let rule6 = new _spacl_core.Rule();
        rule6.deny('create', 'create', 'create');
        assert.strictEqual(rule6.verbs['create'], false, 'Duplicate verbs should result in denied permission');
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_96.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_96.js:1:13)
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