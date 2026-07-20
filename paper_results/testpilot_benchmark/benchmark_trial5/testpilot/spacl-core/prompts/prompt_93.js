The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches', function(done) {
        // Test 1: Basic regex match without props
        const rule1 = new _spacl_core.Rule();
        rule1.regex = /^\/api\/users$/;
        rule1.regex.props = [];
        
        assert.strictEqual(rule1.matches('/api/users', {}), true);
        assert.strictEqual(rule1.matches('/api/posts', {}), false);
        assert.strictEqual(rule1.matches('/api/users/123', {}), false);

        // Test 2: Regex with capture groups and props
        const rule2 = new _spacl_core.Rule();
        rule2.regex = /^\/api\/users\/([^\/]+)$/;
        rule2.regex.props = ['userId'];
        
        const ctx1 = { userId: '123' };
        const ctx2 = { userId: '456' };
        const ctx3 = { userId: '123', other: 'value' };
        
        assert.strictEqual(rule2.matches('/api/users/123', ctx1), true);
        assert.strictEqual(rule2.matches('/api/users/456', ctx2), true);
        assert.strictEqual(rule2.matches('/api/users/123', ctx3), true);
        assert.strictEqual(rule2.matches('/api/users/456', ctx1), false);
        assert.strictEqual(rule2.matches('/api/users/123', ctx2), false);

        // Test 3: Multiple capture groups and props
        const rule3 = new _spacl_core.Rule();
        rule3.regex = /^\/api\/users\/([^\/]+)\/posts\/([^\/]+)$/;
        rule3.regex.props = ['userId', 'postId'];
        
        const ctx4 = { userId: '123', postId: '456' };
        const ctx5 = { userId: '123', postId: '789' };
        
        assert.strictEqual(rule3.matches('/api/users/123/posts/456', ctx4), true);
        assert.strictEqual(rule3.matches('/api/users/123/posts/789', ctx5), true);
        assert.strictEqual(rule3.matches('/api/users/123/posts/456', ctx5), false);

        // Test 4: Missing context when props are required
        const rule4 = new _spacl_core.Rule();
        rule4.regex = /^\/api\/users\/([^\/]+)$/;
        rule4.regex.props = ['userId'];
        
        assert.strictEqual(rule4.matches('/api/users/123', undefined), false);
        assert.strictEqual(rule4.matches('/api/users/123'), false);

        // Test 5: Missing property in context
        const rule5 = new _spacl_core.Rule();
        rule5.regex = /^\/api\/users\/([^\/]+)$/;
        rule5.regex.props = ['userId'];
        
        const ctx6 = { otherProp: '123' };
        const ctx7 = {};
        
        assert.strictEqual(rule5.matches('/api/users/123', ctx6), false);
        assert.strictEqual(rule5.matches('/api/users/123', ctx7), false);

        // Test 6: No regex match
        const rule6 = new _spacl_core.Rule();
        rule6.regex = /^\/api\/users$/;
        rule6.regex.props = [];
        
        assert.strictEqual(rule6.matches('/completely/different/path', {}), false);
        assert.strictEqual(rule6.matches('', {}), false);

        // Test 7: Empty props array with matching regex
        const rule7 = new _spacl_core.Rule();
        rule7.regex = /^\/public$/;
        rule7.regex.props = [];
        
        assert.strictEqual(rule7.matches('/public', undefined), true);
        assert.strictEqual(rule7.matches('/public', {}), true);
        assert.strictEqual(rule7.matches('/public', { someKey: 'someValue' }), true);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_146.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_146.js:1:13)
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