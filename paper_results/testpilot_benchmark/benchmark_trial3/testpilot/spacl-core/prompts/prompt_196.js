The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone', function(done) {
        // Test 1: Clone with default parameters (deep clone, same name)
        const rule1 = _spacl_core.Rule.for('/user/+').allow('get');
        const rule2 = _spacl_core.Rule.for('/user/:name').allow('put');
        const originalPolicy = _spacl_core.Policy.for('user', rule1, rule2);
        
        const clonedPolicy = originalPolicy.clone();
        
        // Should have same name
        assert.strictEqual(clonedPolicy.name, 'user');
        
        // Should have same number of rules
        assert.strictEqual(clonedPolicy.rules.length, originalPolicy.rules.length);
        
        // Rules should be deep cloned (different objects but same content)
        assert.notStrictEqual(clonedPolicy.rules[0], originalPolicy.rules[0]);
        assert.notStrictEqual(clonedPolicy.rules[1], originalPolicy.rules[1]);
        
        // Test 2: Clone with custom name
        const renamedClone = originalPolicy.clone('admin');
        assert.strictEqual(renamedClone.name, 'admin');
        assert.strictEqual(renamedClone.rules.length, originalPolicy.rules.length);
        
        // Test 3: Shallow clone
        const shallowClone = originalPolicy.clone('shallow', false);
        assert.strictEqual(shallowClone.name, 'shallow');
        assert.strictEqual(shallowClone.rules.length, originalPolicy.rules.length);
        
        // Rules should be the same objects (shallow copy)
        assert.strictEqual(shallowClone.rules[0], originalPolicy.rules[0]);
        assert.strictEqual(shallowClone.rules[1], originalPolicy.rules[1]);
        
        // Test 4: Clone empty policy
        const emptyPolicy = new _spacl_core.Policy('empty');
        const emptyClone = emptyPolicy.clone('emptyClone');
        assert.strictEqual(emptyClone.name, 'emptyClone');
        assert.strictEqual(emptyClone.rules.length, 0);
        
        // Test 5: Verify cloned policy can be modified independently
        const modifiableClone = originalPolicy.clone('modifiable');
        const newRule = _spacl_core.Rule.for('/admin/+').allow('delete');
        modifiableClone.push(newRule);
        
        // Original should be unchanged
        assert.strictEqual(originalPolicy.rules.length, 2);
        assert.strictEqual(modifiableClone.rules.length, 3);
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_311.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_311.js:1:13)
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