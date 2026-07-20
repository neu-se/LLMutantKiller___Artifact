The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekLength', function(done) {
        // Test 1: peekLength with text operation at beginning
        let delta1 = new quill_delta.Delta([
            { insert: 'hello' },
            { insert: 'world' }
        ]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekLength(), 5, 'Should return length of first operation');

        // Test 2: peekLength after consuming part of an operation
        iter1.next(2); // consume 2 characters from 'hello'
        assert.strictEqual(iter1.peekLength(), 3, 'Should return remaining length after offset');

        // Test 3: peekLength with retain operation
        let delta2 = new quill_delta.Delta([
            { retain: 10 },
            { insert: 'test' }
        ]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekLength(), 10, 'Should return length of retain operation');

        // Test 4: peekLength with delete operation
        let delta3 = new quill_delta.Delta([
            { delete: 7 },
            { insert: 'new' }
        ]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekLength(), 7, 'Should return length of delete operation');

        // Test 5: peekLength when iterator is at the end
        let delta4 = new quill_delta.Delta([{ insert: 'end' }]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        iter4.next(3); // consume all characters
        assert.strictEqual(iter4.peekLength(), Infinity, 'Should return Infinity when past end of operations');

        // Test 6: peekLength with empty delta
        let delta5 = new quill_delta.Delta([]);
        let iter5 = new quill_delta.OpIterator(delta5.ops);
        assert.strictEqual(iter5.peekLength(), Infinity, 'Should return Infinity for empty operations array');

        // Test 7: peekLength with mixed operations after partial consumption
        let delta6 = new quill_delta.Delta([
            { insert: 'abc' },
            { retain: 5 },
            { delete: 2 }
        ]);
        let iter6 = new quill_delta.OpIterator(delta6.ops);
        iter6.next(3); // consume first operation completely
        assert.strictEqual(iter6.peekLength(), 5, 'Should return length of next operation after consuming previous');

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_135.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_135.js:1:13)
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