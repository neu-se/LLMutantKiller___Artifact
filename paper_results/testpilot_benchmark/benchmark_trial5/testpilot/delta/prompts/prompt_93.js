The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest', function(done) {
        // Test 1: Empty iterator - should return empty array
        let emptyDelta = new quill_delta.Delta();
        let emptyIterator = new quill_delta.OpIterator(emptyDelta.ops);
        assert.deepEqual(emptyIterator.rest(), []);

        // Test 2: Iterator at beginning with no offset - should return all ops
        let delta1 = new quill_delta.Delta()
            .insert('Hello')
            .insert(' ')
            .insert('World');
        let iterator1 = new quill_delta.OpIterator(delta1.ops);
        let expected1 = [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ];
        assert.deepEqual(iterator1.rest(), expected1);

        // Test 3: Iterator after consuming some ops with no offset
        let delta2 = new quill_delta.Delta()
            .insert('Hello')
            .insert(' ')
            .insert('World');
        let iterator2 = new quill_delta.OpIterator(delta2.ops);
        iterator2.next(); // consume first op
        let expected2 = [
            { insert: ' ' },
            { insert: 'World' }
        ];
        assert.deepEqual(iterator2.rest(), expected2);

        // Test 4: Iterator with offset - should return partial current op plus remaining ops
        let delta3 = new quill_delta.Delta()
            .insert('Hello World')
            .insert('!');
        let iterator3 = new quill_delta.OpIterator(delta3.ops);
        iterator3.next(5); // consume 5 characters, creating offset
        let result3 = iterator3.rest();
        let expected3 = [
            { insert: ' World' },
            { insert: '!' }
        ];
        assert.deepEqual(result3, expected3);

        // Test 5: Iterator at end - should return empty array
        let delta4 = new quill_delta.Delta().insert('Test');
        let iterator4 = new quill_delta.OpIterator(delta4.ops);
        iterator4.next(); // consume all ops
        assert.deepEqual(iterator4.rest(), []);

        // Test 6: Verify iterator state is preserved after rest() call
        let delta5 = new quill_delta.Delta()
            .insert('Hello')
            .insert(' World');
        let iterator5 = new quill_delta.OpIterator(delta5.ops);
        iterator5.next(3); // consume 3 characters, creating offset
        let originalIndex = iterator5.index;
        let originalOffset = iterator5.offset;
        iterator5.rest();
        // Verify state is restored
        assert.equal(iterator5.index, originalIndex);
        assert.equal(iterator5.offset, originalOffset);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_151.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_151.js:1:13)
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