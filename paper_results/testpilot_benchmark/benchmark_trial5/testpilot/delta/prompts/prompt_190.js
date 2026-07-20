The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete', function(done) {
        // Test 1: Basic delete operation
        const delta1 = new quill_delta().insert('Hello World').delete(5);
        assert.equal(delta1.ops.length, 2);
        assert.deepEqual(delta1.ops[0], { insert: 'Hello World' });
        assert.deepEqual(delta1.ops[1], { delete: 5 });

        // Test 2: Delete operation in a chain with retain and insert
        const delta2 = new quill_delta().retain(12)
                                       .insert('White', { color: '#fff' })
                                       .delete(4);
        assert.equal(delta2.ops.length, 3);
        assert.deepEqual(delta2.ops[0], { retain: 12 });
        assert.deepEqual(delta2.ops[1], { insert: 'White', attributes: { color: '#fff' } });
        assert.deepEqual(delta2.ops[2], { delete: 4 });

        // Test 3: Delete operation affects length calculation
        const delta3 = new quill_delta().insert('A').retain(2).delete(1);
        assert.equal(delta3.length(), 4);

        // Test 4: Multiple delete operations
        const delta4 = new quill_delta().delete(3).insert('test').delete(2);
        assert.equal(delta4.ops.length, 3);
        assert.deepEqual(delta4.ops[0], { delete: 3 });
        assert.deepEqual(delta4.ops[1], { insert: 'test' });
        assert.deepEqual(delta4.ops[2], { delete: 2 });

        // Test 5: Delete with zero length (should not add operation)
        const delta5 = new quill_delta().insert('Hello').delete(0);
        assert.equal(delta5.ops.length, 1);
        assert.deepEqual(delta5.ops[0], { insert: 'Hello' });

        // Test 6: Composition with delete operation
        const base = new quill_delta().insert('abc');
        const deleteOp = new quill_delta().retain(1).delete(1);
        const composed = base.compose(deleteOp);
        assert.equal(composed.ops.length, 1);
        assert.deepEqual(composed.ops[0], { insert: 'ac' });

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_300.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_300.js:1:13)
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