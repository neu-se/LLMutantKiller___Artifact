The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
        try {
            // Create user policy - allows get/put on own resources, get on others
            const userPolicy = new _spacl_core.Policy();
            userPolicy.allow('/user/{name}', 'get', (ctx) => true);
            userPolicy.allow('/user/{name}', 'put', (ctx, params) => ctx.name === params.name);
            userPolicy.allow('/user/*', 'get', (ctx) => true);

            // Create admin policy - allows everything except delete on own resources
            const adminPolicy = new _spacl_core.Policy();
            adminPolicy.allow('/user/*', 'get', (ctx) => true);
            adminPolicy.allow('/user/*', 'put', (ctx) => true);
            adminPolicy.allow('/user/{name}', 'delete', (ctx, params) => ctx.name !== params.name);
            adminPolicy.deny('/user/{name}', 'delete', (ctx, params) => ctx.name === params.name);

            // Test context
            const ctx = { name: 'foo' };

            // Test user policy
            assert.strictEqual(userPolicy.query('/user/foo', 'get', ctx), true, 'user should be able to get own resource');
            assert.strictEqual(userPolicy.query('/user/foo', 'put', ctx), true, 'user should be able to put own resource');
            assert.strictEqual(userPolicy.query('/user/foo', 'delete', ctx), null, 'user delete on own resource should be implicitly denied');
            assert.strictEqual(userPolicy.query('/user/bar', 'get', ctx), true, 'user should be able to get other resources');
            assert.strictEqual(userPolicy.query('/user/bar', 'put', ctx), null, 'user put on other resource should be implicitly denied');
            assert.strictEqual(userPolicy.query('/user/bar', 'delete', ctx), null, 'user delete on other resource should be implicitly denied');

            // Test admin policy
            assert.strictEqual(adminPolicy.query('/user/foo', 'get', ctx), true, 'admin should be able to get own resource');
            assert.strictEqual(adminPolicy.query('/user/foo', 'put', ctx), true, 'admin should be able to put own resource');
            assert.strictEqual(adminPolicy.query('/user/foo', 'delete', ctx), false, 'admin delete on own resource should be explicitly denied');
            assert.strictEqual(adminPolicy.query('/user/bar', 'get', ctx), true, 'admin should be able to get other resources');
            assert.strictEqual(adminPolicy.query('/user/bar', 'put', ctx), true, 'admin should be able to put other resources');
            assert.strictEqual(adminPolicy.query('/user/bar', 'delete', ctx), true, 'admin should be able to delete other resources');

            // Test edge cases
            assert.strictEqual(userPolicy.query('/nonexistent', 'get', ctx), null, 'query on non-matching path should return null');
            assert.strictEqual(adminPolicy.query('/user/foo', 'patch', ctx), null, 'query with non-configured verb should return null');

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
- /path/to/test/test_275.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_275.js:1:13)
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