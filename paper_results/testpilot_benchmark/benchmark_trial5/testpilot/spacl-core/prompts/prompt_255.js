The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create mock policies that simulate the behavior from the examples
        const mockUserPolicy = {
            query: function(path, verb, ctx) {
                if (path === '/user/foo' && (verb === 'get' || verb === 'put')) {
                    return true;
                }
                if (path === '/user/bar' && verb === 'get') {
                    return true;
                }
                return null; // implicitly denied
            }
        };
        
        const mockAdminPolicy = {
            query: function(path, verb, ctx) {
                if (path === '/user/foo' && verb === 'delete') {
                    return false; // explicitly denied
                }
                if (path === '/user/foo' && (verb === 'get' || verb === 'put')) {
                    return true;
                }
                if (path === '/user/bar' && (verb === 'get' || verb === 'put' || verb === 'delete')) {
                    return true;
                }
                return null;
            }
        };
        
        // Add policies to the map
        policyMap.set('user', mockUserPolicy);
        policyMap.set('admin', mockAdminPolicy);
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user policy queries
        assert.strictEqual(policyMap.query('user', '/user/foo', 'get', ctx), true);
        assert.strictEqual(policyMap.query('user', '/user/foo', 'put', ctx), true);
        assert.strictEqual(policyMap.query('user', '/user/foo', 'delete', ctx), null);
        assert.strictEqual(policyMap.query('user', '/user/bar', 'get', ctx), true);
        assert.strictEqual(policyMap.query('user', '/user/bar', 'put', ctx), null);
        assert.strictEqual(policyMap.query('user', '/user/bar', 'delete', ctx), null);
        
        // Test admin policy queries
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'get', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'put', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'delete', ctx), false);
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'get', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'put', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'delete', ctx), true);
        
        // Test querying non-existent policy
        assert.strictEqual(policyMap.query('nonexistent', '/user/foo', 'get', ctx), null);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_397.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_397.js:1:13)
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