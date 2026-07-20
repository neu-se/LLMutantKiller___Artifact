The test:
```
let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.slice', function(done) {
        // Test 1: Basic slice with start and end parameters
        let delta1 = new Delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } },
            { insert: '!' }
        ]);
        
        let sliced1 = delta1.slice(0, 5);
        assert.deepEqual(sliced1.ops, [{ insert: 'Hello' }]);
        
        // Test 2: Slice with only start parameter
        let sliced2 = delta1.slice(6);
        assert.deepEqual(sliced2.ops, [
            { insert: 'World', attributes: { bold: true } },
            { insert: '!' }
        ]);
        
        // Test 3: Slice with negative start (should be treated as 0)
        let sliced3 = delta1.slice(-1, 5);
        assert.deepEqual(sliced3.ops, [{ insert: 'Hello' }]);
        
        // Test 4: Slice beyond delta length
        let sliced4 = delta1.slice(0, 100);
        assert.deepEqual(sliced4.ops, delta1.ops);
        
        // Test 5: Empty slice (start >= end)
        let sliced5 = delta1.slice(5, 5);
        assert.deepEqual(sliced5.ops, []);
        
        // Test 6: Slice with default parameters
        let delta2 = new Delta([{ insert: 'Test' }]);
        let sliced6 = delta2.slice();
        assert.deepEqual(sliced6.ops, [{ insert: 'Test' }]);
        
        // Test 7: Slice across multiple operations
        let delta3 = new Delta([
            { insert: 'ABC' },
            { insert: 'DEF', attributes: { italic: true } },
            { insert: 'GHI' }
        ]);
        let sliced7 = delta3.slice(2, 7);
        assert.deepEqual(sliced7.ops, [
            { insert: 'C' },
            { insert: 'DEF', attributes: { italic: true } },
            { insert: 'G' }
        ]);
        
        // Test 8: Empty delta
        let delta4 = new Delta();
        let sliced8 = delta4.slice(0, 5);
        assert.deepEqual(sliced8.ops, []);
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_523.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_523.js:1:13)
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