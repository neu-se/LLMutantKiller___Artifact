The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny', function(done) {
        // Test 1: Basic deny functionality with single verb
        const rule1 = _spacl_core.Rule.for('/test/path');
        rule1.deny('delete');
        assert.strictEqual(rule1.verbs.delete, false, 'Single verb should be denied');

        // Test 2: Deny multiple verbs at once
        const rule2 = _spacl_core.Rule.for('/test/path2');
        rule2.deny('put', 'post', 'delete');
        assert.strictEqual(rule2.verbs.put, false, 'PUT verb should be denied');
        assert.strictEqual(rule2.verbs.post, false, 'POST verb should be denied');
        assert.strictEqual(rule2.verbs.delete, false, 'DELETE verb should be denied');

        // Test 3: Method chaining - deny should return the rule instance
        const rule3 = _spacl_core.Rule.for('/test/path3');
        const returnedRule = rule3.deny('get');
        assert.strictEqual(returnedRule, rule3, 'deny() should return the same rule instance for chaining');

        // Test 4: Deny after allow - should override allowed verbs
        const rule4 = _spacl_core.Rule.for('/test/path4');
        rule4.allow('get', 'post');
        rule4.deny('get');
        assert.strictEqual(rule4.verbs.get, false, 'Denied verb should override previously allowed verb');
        assert.strictEqual(rule4.verbs.post, true, 'Other allowed verbs should remain unaffected');

        // Test 5: Deny with no arguments should not throw error
        const rule5 = _spacl_core.Rule.for('/test/path5');
        try {
            rule5.deny();
            assert.ok(true, 'deny() with no arguments should not throw error');
        } catch (error) {
            assert.fail('deny() with no arguments should not throw error');
        }

        // Test 6: Chain multiple deny calls
        const rule6 = _spacl_core.Rule.for('/test/path6');
        rule6.deny('get').deny('post').deny('put');
        assert.strictEqual(rule6.verbs.get, false, 'First denied verb should be false');
        assert.strictEqual(rule6.verbs.post, false, 'Second denied verb should be false');
        assert.strictEqual(rule6.verbs.put, false, 'Third denied verb should be false');

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_98.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_98.js:1:13)
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