The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap complex patterns', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test multiple policies with different patterns
            policyMap.add('policy1', '/users/*', { action: 'read' });
            policyMap.add('policy2', '/users/*/profile', { action: 'write' });
            policyMap.add('policy3', '/admin/**', { role: 'admin' });
            
            // Test nested path matching
            let result1 = policyMap.matches('policy1', '/users/123', {});
            assert.strictEqual(result1, true, 'Should match single level wildcard');
            
            let result2 = policyMap.matches('policy2', '/users/123/profile', {});
            assert.strictEqual(result2, true, 'Should match specific nested path');
            
            let result3 = policyMap.matches('policy3', '/admin/users/delete', { role: 'admin' });
            assert.strictEqual(result3, true, 'Should match multi-level wildcard');
            
            // Test non-matching cases
            let result4 = policyMap.matches('policy2', '/users/123/settings', {});
            assert.strictEqual(result4, false, 'Should not match different endpoint');
            
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
- /path/to/test/test_404.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_404.js:1:13)
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