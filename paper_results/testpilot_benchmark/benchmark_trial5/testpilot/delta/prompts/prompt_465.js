The test:
```
let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition', function(done) {
        // Test case 1: Position before insertion point remains unchanged
        const delta1 = new Delta().retain(5).insert('a');
        assert.strictEqual(delta1.transformPosition(4), 4);
        
        // Test case 2: Position at insertion point gets shifted
        assert.strictEqual(delta1.transformPosition(5), 6);
        
        // Test case 3: Position after insertion point gets shifted
        assert.strictEqual(delta1.transformPosition(6), 7);
        
        // Test case 4: Multiple insertions
        const delta2 = new Delta().retain(2).insert('hello').retain(3).insert('world');
        assert.strictEqual(delta2.transformPosition(1), 1); // before first insertion
        assert.strictEqual(delta2.transformPosition(2), 7); // at first insertion point
        assert.strictEqual(delta2.transformPosition(5), 15); // at second insertion point
        
        // Test case 5: Deletions
        const delta3 = new Delta().retain(3).delete(2).retain(5);
        assert.strictEqual(delta3.transformPosition(2), 2); // before deletion
        assert.strictEqual(delta3.transformPosition(3), 3); // at deletion start
        assert.strictEqual(delta3.transformPosition(4), 3); // within deletion range
        assert.strictEqual(delta3.transformPosition(5), 3); // at deletion end
        assert.strictEqual(delta3.transformPosition(6), 4); // after deletion
        
        // Test case 6: Priority parameter with insertion
        const delta4 = new Delta().retain(5).insert('test');
        assert.strictEqual(delta4.transformPosition(5, false), 9); // default priority
        assert.strictEqual(delta4.transformPosition(5, true), 5); // high priority
        
        // Test case 7: Empty delta
        const delta5 = new Delta();
        assert.strictEqual(delta5.transformPosition(5), 5);
        
        // Test case 8: Only retains
        const delta6 = new Delta().retain(10);
        assert.strictEqual(delta6.transformPosition(5), 5);
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_720.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_720.js:1:13)
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