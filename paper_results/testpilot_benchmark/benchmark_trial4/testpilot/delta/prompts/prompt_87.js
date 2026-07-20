The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekLength', function(done) {
        // Test 1: Empty delta
        let emptyDelta = new quill_delta.Delta();
        let emptyIterator = new quill_delta.OpIterator(emptyDelta.ops);
        assert.strictEqual(emptyIterator.peekLength(), Infinity);

        // Test 2: Single insert operation
        let singleOpDelta = new quill_delta.Delta().insert('hello');
        let singleOpIterator = new quill_delta.OpIterator(singleOpDelta.ops);
        assert.strictEqual(singleOpIterator.peekLength(), 5);

        // Test 3: Multiple operations
        let multiOpDelta = new quill_delta.Delta()
            .insert('hello')
            .insert(' world')
            .retain(3);
        let multiOpIterator = new quill_delta.OpIterator(multiOpDelta.ops);
        assert.strictEqual(multiOpIterator.peekLength(), 5); // First op length

        // Test 4: After consuming some operations
        multiOpIterator.next(3); // Consume 3 characters from first op
        assert.strictEqual(multiOpIterator.peekLength(), 2); // Remaining from first op

        multiOpIterator.next(2); // Consume remaining from first op
        assert.strictEqual(multiOpIterator.peekLength(), 6); // Second op length

        // Test 5: Delete operation
        let deleteOpDelta = new quill_delta.Delta().delete(10);
        let deleteOpIterator = new quill_delta.OpIterator(deleteOpDelta.ops);
        assert.strictEqual(deleteOpIterator.peekLength(), 10);

        // Test 6: Retain operation
        let retainOpDelta = new quill_delta.Delta().retain(7);
        let retainOpIterator = new quill_delta.OpIterator(retainOpDelta.ops);
        assert.strictEqual(retainOpIterator.peekLength(), 7);

        // Test 7: Mixed operations with partial consumption
        let mixedDelta = new quill_delta.Delta()
            .retain(5)
            .insert('test')
            .delete(3);
        let mixedIterator = new quill_delta.OpIterator(mixedDelta.ops);
        
        assert.strictEqual(mixedIterator.peekLength(), 5); // First retain
        mixedIterator.next(5);
        assert.strictEqual(mixedIterator.peekLength(), 4); // Insert 'test'
        mixedIterator.next(4);
        assert.strictEqual(mixedIterator.peekLength(), 3); // Delete

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_140.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_140.js:1:13)
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