The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter', function(done) {
        // Test 1: Filter operations by type (retain)
        let delta1 = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { retain: 3 },
            { delete: 2 }
        ]);
        
        let retainOps = delta1.filter(op => op.retain !== undefined);
        assert.strictEqual(retainOps.length, 2);
        assert.strictEqual(retainOps[0].retain, 5);
        assert.strictEqual(retainOps[1].retain, 3);
        
        // Test 2: Filter operations by type (insert)
        let insertOps = delta1.filter(op => op.insert !== undefined);
        assert.strictEqual(insertOps.length, 1);
        assert.strictEqual(insertOps[0].insert, 'hello');
        
        // Test 3: Filter operations by type (delete)
        let deleteOps = delta1.filter(op => op.delete !== undefined);
        assert.strictEqual(deleteOps.length, 1);
        assert.strictEqual(deleteOps[0].delete, 2);
        
        // Test 4: Filter with no matches
        let noMatches = delta1.filter(op => op.nonexistent !== undefined);
        assert.strictEqual(noMatches.length, 0);
        assert.deepStrictEqual(noMatches, []);
        
        // Test 5: Filter on empty delta
        let emptyDelta = new quill_delta([]);
        let emptyResult = emptyDelta.filter(op => true);
        assert.strictEqual(emptyResult.length, 0);
        assert.deepStrictEqual(emptyResult, []);
        
        // Test 6: Filter with complex predicate (operations with attributes)
        let delta2 = new quill_delta([
            { insert: 'bold text', attributes: { bold: true } },
            { insert: 'normal text' },
            { insert: 'italic text', attributes: { italic: true } }
        ]);
        
        let opsWithAttributes = delta2.filter(op => op.attributes !== undefined);
        assert.strictEqual(opsWithAttributes.length, 2);
        assert.strictEqual(opsWithAttributes[0].insert, 'bold text');
        assert.strictEqual(opsWithAttributes[1].insert, 'italic text');
        
        // Test 7: Filter returns array (not Delta object)
        let result = delta1.filter(op => op.retain !== undefined);
        assert.strictEqual(Array.isArray(result), true);
        assert.strictEqual(result instanceof quill_delta, false);
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_379.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_379.js:1:13)
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