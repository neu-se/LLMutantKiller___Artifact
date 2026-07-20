The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Create PolicyMap instances for user and admin roles
        const user = new _spacl_core.PolicyMap();
        const admin = new _spacl_core.PolicyMap();
        
        // Setup user policies - can read/write own data, read others
        user.addPolicy('/user/{name}', 'get', true);
        user.addPolicy('/user/{name}', 'put', function(ctx) {
            return ctx.name === this.name;
        });
        user.addPolicy('/user/*', 'get', true);
        
        // Setup admin policies - full access except delete own account
        admin.addPolicy('/user/*', 'get', true);
        admin.addPolicy('/user/*', 'put', true);
        admin.addPolicy('/user/*', 'delete', true);
        admin.addPolicy('/user/{name}', 'delete', function(ctx) {
            return ctx.name !== this.name;
        });
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user permissions
        assert.strictEqual(user.query('user', '/user/foo', 'get', ctx), true, 'user should be able to get own data');
        assert.strictEqual(user.query('user', '/user/foo', 'put', ctx), true, 'user should be able to put own data');
        assert.strictEqual(user.query('user', '/user/foo', 'delete', ctx), null, 'user delete should be implicitly denied');
        assert.strictEqual(user.query('user', '/user/bar', 'get', ctx), true, 'user should be able to get other user data');
        assert.strictEqual(user.query('user', '/user/bar', 'put', ctx), null, 'user put on other user should be implicitly denied');
        assert.strictEqual(user.query('user', '/user/bar', 'delete', ctx), null, 'user delete on other user should be implicitly denied');
        
        // Test admin permissions
        assert.strictEqual(admin.query('admin', '/user/foo', 'get', ctx), true, 'admin should be able to get user data');
        assert.strictEqual(admin.query('admin', '/user/foo', 'put', ctx), true, 'admin should be able to put user data');
        assert.strictEqual(admin.query('admin', '/user/foo', 'delete', ctx), false, 'admin should be explicitly denied from deleting own account');
        assert.strictEqual(admin.query('admin', '/user/bar', 'get', ctx), true, 'admin should be able to get other user data');
        assert.strictEqual(admin.query('admin', '/user/bar', 'put', ctx), true, 'admin should be able to put other user data');
        assert.strictEqual(admin.query('admin', '/user/bar', 'delete', ctx), true, 'admin should be able to delete other user data');
        
        done();
    });
    
    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_382.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_382.js:1:13)
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