The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain', function(done) {
        // Test 1: Basic retain with positive length
        const delta1 = new quill_delta().retain(5);
        assert.deepEqual(delta1.ops, [{ retain: 5 }]);
        
        // Test 2: Retain with attributes
        const delta2 = new quill_delta().retain(3, { bold: true });
        assert.deepEqual(delta2.ops, [{ retain: 3, attributes: { bold: true } }]);
        
        // Test 3: Retain with multiple attributes
        const delta3 = new quill_delta().retain(2, { bold: true, italic: true, color: '#fff' });
        assert.deepEqual(delta3.ops, [{ retain: 2, attributes: { bold: true, italic: true, color: '#fff' } }]);
        
        // Test 4: Retain with zero length should return unchanged delta
        const delta4 = new quill_delta().insert('test');
        const delta4_before = JSON.parse(JSON.stringify(delta4.ops));
        const delta4_after = delta4.retain(0);
        assert.deepEqual(delta4_after.ops, delta4_before);
        assert.strictEqual(delta4_after, delta4); // Should return same instance
        
        // Test 5: Retain with negative length should return unchanged delta
        const delta5 = new quill_delta().insert('test');
        const delta5_before = JSON.parse(JSON.stringify(delta5.ops));
        const delta5_after = delta5.retain(-5);
        assert.deepEqual(delta5_after.ops, delta5_before);
        assert.strictEqual(delta5_after, delta5); // Should return same instance
        
        // Test 6: Retain with null attributes should not include attributes
        const delta6 = new quill_delta().retain(4, null);
        assert.deepEqual(delta6.ops, [{ retain: 4 }]);
        
        // Test 7: Retain with empty attributes object should not include attributes
        const delta7 = new quill_delta().retain(4, {});
        assert.deepEqual(delta7.ops, [{ retain: 4 }]);
        
        // Test 8: Retain with undefined attributes should not include attributes
        const delta8 = new quill_delta().retain(4, undefined);
        assert.deepEqual(delta8.ops, [{ retain: 4 }]);
        
        // Test 9: Chaining multiple retain operations
        const delta9 = new quill_delta()
            .retain(5)
            .retain(3, { bold: true })
            .retain(2, { italic: true });
        assert.deepEqual(delta9.ops, [
            { retain: 5 },
            { retain: 3, attributes: { bold: true } },
            { retain: 2, attributes: { italic: true } }
        ]);
        
        // Test 10: Retain in combination with other operations (based on usage examples)
        const delta10 = new quill_delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        assert.deepEqual(delta10.ops, [
            { retain: 12 },
            { insert: 'White', attributes: { color: '#fff' } },
            { delete: 4 }
        ]);
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_309.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_309.js:1:13)
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