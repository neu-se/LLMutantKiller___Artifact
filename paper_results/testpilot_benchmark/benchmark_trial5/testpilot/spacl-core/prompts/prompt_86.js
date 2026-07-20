The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        try {
            // Create user rule that allows limited access
            const user = new _spacl_core.Rule();
            user.allow('/user/:name', 'get', (ctx) => true);
            user.allow('/user/:name', 'put', (ctx, params) => ctx.name === params.name);
            
            // Create admin rule that allows broader access but denies delete on own user
            const admin = new _spacl_core.Rule();
            admin.allow('/user/:name', 'get', (ctx) => true);
            admin.allow('/user/:name', 'put', (ctx) => true);
            admin.allow('/user/:name', 'delete', (ctx, params) => ctx.name !== params.name);
            admin.deny('/user/:name', 'delete', (ctx, params) => ctx.name === params.name);
            
            // Test context
            const ctx = { name: 'foo' };
            
            // Test user rule queries
            assert.strictEqual(user.query('/user/foo', 'get', ctx), true, 'user should be able to get /user/foo');
            assert.strictEqual(user.query('/user/foo', 'put', ctx), true, 'user should be able to put /user/foo');
            assert.strictEqual(user.query('/user/foo', 'delete', ctx), null, 'user delete /user/foo should be implicitly denied');
            assert.strictEqual(user.query('/user/bar', 'get', ctx), true, 'user should be able to get /user/bar');
            assert.strictEqual(user.query('/user/bar', 'put', ctx), null, 'user put /user/bar should be implicitly denied');
            assert.strictEqual(user.query('/user/bar', 'delete', ctx), null, 'user delete /user/bar should be implicitly denied');
            
            // Test admin rule queries
            assert.strictEqual(admin.query('/user/foo', 'get', ctx), true, 'admin should be able to get /user/foo');
            assert.strictEqual(admin.query('/user/foo', 'put', ctx), true, 'admin should be able to put /user/foo');
            assert.strictEqual(admin.query('/user/foo', 'delete', ctx), false, 'admin delete /user/foo should be explicitly denied');
            assert.strictEqual(admin.query('/user/bar', 'get', ctx), true, 'admin should be able to get /user/bar');
            assert.strictEqual(admin.query('/user/bar', 'put', ctx), true, 'admin should be able to put /user/bar');
            assert.strictEqual(admin.query('/user/bar', 'delete', ctx), true, 'admin should be able to delete /user/bar');
            
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
- /path/to/test/test_131.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_131.js:1:13)
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