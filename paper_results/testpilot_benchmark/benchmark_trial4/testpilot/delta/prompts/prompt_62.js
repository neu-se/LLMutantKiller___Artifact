The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.hasNext', function(done) {
        // Test 1: OpIterator with operations should have next
        let delta1 = new quill_delta.Delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let iterator1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iterator1.hasNext(), true, 'Iterator with operations should have next');

        // Test 2: After consuming some operations, should still have next if more remain
        iterator1.next(3); // consume 3 characters from "Hello"
        assert.strictEqual(iterator1.hasNext(), true, 'Iterator should still have next after partial consumption');

        // Test 3: After consuming all operations, should not have next
        iterator1.next(); // consume remaining "lo"
        iterator1.next(); // consume " World"
        assert.strictEqual(iterator1.hasNext(), false, 'Iterator should not have next after consuming all operations');

        // Test 4: Empty OpIterator should not have next
        let emptyDelta = new quill_delta.Delta([]);
        let emptyIterator = new quill_delta.OpIterator(emptyDelta.ops);
        assert.strictEqual(emptyIterator.hasNext(), false, 'Empty iterator should not have next');

        // Test 5: OpIterator with single operation
        let singleOpDelta = new quill_delta.Delta([{ insert: 'A' }]);
        let singleOpIterator = new quill_delta.OpIterator(singleOpDelta.ops);
        assert.strictEqual(singleOpIterator.hasNext(), true, 'Single operation iterator should have next initially');
        singleOpIterator.next();
        assert.strictEqual(singleOpIterator.hasNext(), false, 'Single operation iterator should not have next after consumption');

        // Test 6: OpIterator with retain and delete operations
        let mixedDelta = new quill_delta.Delta([
            { retain: 5 },
            { delete: 3 },
            { insert: 'test' }
        ]);
        let mixedIterator = new quill_delta.OpIterator(mixedDelta.ops);
        assert.strictEqual(mixedIterator.hasNext(), true, 'Mixed operations iterator should have next');
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_109.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_109.js:1:13)
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