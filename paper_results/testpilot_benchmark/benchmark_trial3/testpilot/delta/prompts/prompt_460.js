The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition', function(done) {
        // Test 1: Empty delta - position should remain unchanged
        let delta1 = new quill_delta();
        assert.equal(delta1.transformPosition(5), 5);
        assert.equal(delta1.transformPosition(0), 0);

        // Test 2: Delta with only retain operations - position should remain unchanged
        let delta2 = new quill_delta().retain(10);
        assert.equal(delta2.transformPosition(5), 5);
        assert.equal(delta2.transformPosition(15), 15);

        // Test 3: Delta with insert operations - position should be shifted forward
        let delta3 = new quill_delta().insert('hello');
        assert.equal(delta3.transformPosition(0), 5); // Insert at beginning shifts position
        assert.equal(delta3.transformPosition(5), 10); // Insert before position shifts it

        // Test 4: Delta with delete operations - position should be shifted backward
        let delta4 = new quill_delta().delete(3);
        assert.equal(delta4.transformPosition(5), 2); // Delete before position shifts it back
        assert.equal(delta4.transformPosition(2), 0); // Delete at position moves it to start of deletion
        assert.equal(delta4.transformPosition(1), 0); // Delete covers position

        // Test 5: Complex delta with multiple operations
        let delta5 = new quill_delta()
            .retain(2)
            .insert('ab')
            .delete(3)
            .retain(5)
            .insert('cd');
        
        assert.equal(delta5.transformPosition(0), 0); // Before any operations
        assert.equal(delta5.transformPosition(2), 4); // After retain and insert
        assert.equal(delta5.transformPosition(5), 4); // After delete operation
        assert.equal(delta5.transformPosition(10), 11); // After final insert

        // Test 6: Priority parameter testing
        let delta6 = new quill_delta().insert('test');
        assert.equal(delta6.transformPosition(0, false), 4); // Without priority, insert shifts position
        assert.equal(delta6.transformPosition(0, true), 0); // With priority, position at insert point doesn't shift

        // Test 7: Priority with insert at exact position
        let delta7 = new quill_delta().retain(3).insert('xy');
        assert.equal(delta7.transformPosition(3, false), 5); // Without priority, insert shifts position
        assert.equal(delta7.transformPosition(3, true), 3); // With priority, position doesn't shift

        // Test 8: Multiple inserts and deletes
        let delta8 = new quill_delta()
            .insert('start')
            .retain(2)
            .delete(1)
            .insert('mid')
            .retain(3)
            .delete(2);
        
        assert.equal(delta8.transformPosition(0), 5); // Insert at start
        assert.equal(delta8.transformPosition(3), 7); // After first insert and retain, before delete
        assert.equal(delta8.transformPosition(8), 12); // After all operations

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_714.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_714.js:1:13)
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