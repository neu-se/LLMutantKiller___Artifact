The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain', function(done) {
        // Test 1: Basic retain without attributes
        const delta1 = new quill_delta().retain(5);
        assert.deepEqual(delta1.ops, [{ retain: 5 }]);
        
        // Test 2: Retain with attributes
        const delta2 = new quill_delta().retain(3, { bold: true });
        assert.deepEqual(delta2.ops, [{ retain: 3, attributes: { bold: true } }]);
        
        // Test 3: Multiple retain operations
        const delta3 = new quill_delta()
            .retain(2)
            .retain(3, { italic: true })
            .retain(1, { color: 'red' });
        assert.deepEqual(delta3.ops, [
            { retain: 2 },
            { retain: 3, attributes: { italic: true } },
            { retain: 1, attributes: { color: 'red' } }
        ]);
        
        // Test 4: Retain with complex attributes
        const delta4 = new quill_delta().retain(10, { 
            bold: true, 
            italic: true, 
            color: '#fff' 
        });
        assert.deepEqual(delta4.ops, [{ 
            retain: 10, 
            attributes: { 
                bold: true, 
                italic: true, 
                color: '#fff' 
            } 
        }]);
        
        // Test 5: Retain zero length (should not add operation)
        const delta5 = new quill_delta().retain(0);
        assert.deepEqual(delta5.ops, []);
        
        // Test 6: Chaining retain with other operations
        const delta6 = new quill_delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        assert.deepEqual(delta6.ops, [
            { retain: 12 },
            { insert: 'White', attributes: { color: '#fff' } },
            { delete: 4 }
        ]);
        
        // Test 7: Retain with null attributes (should remove attributes)
        const delta7 = new quill_delta().retain(6, { bold: null });
        assert.deepEqual(delta7.ops, [{ retain: 6, attributes: { bold: null } }]);
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_320.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_320.js:1:13)
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