The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test with insert operation
        let delta1 = new quill_delta.Delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekType(), 'insert', 'Should return insert type for insert operation');
        
        // Test with retain operation
        let delta2 = new quill_delta.Delta([
            { retain: 5 },
            { insert: 'text' }
        ]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekType(), 'retain', 'Should return retain type for retain operation');
        
        // Test with delete operation
        let delta3 = new quill_delta.Delta([
            { delete: 3 },
            { insert: 'new text' }
        ]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekType(), 'delete', 'Should return delete type for delete operation');
        
        // Test with empty operations
        let delta4 = new quill_delta.Delta([]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        assert.strictEqual(iter4.peekType(), 'retain', 'Should return retain type for empty operations');
        
        // Test after consuming operations
        let delta5 = new quill_delta.Delta([
            { insert: 'first' },
            { retain: 2 },
            { delete: 1 }
        ]);
        let iter5 = new quill_delta.OpIterator(delta5.ops);
        iter5.next(); // consume first operation
        assert.strictEqual(iter5.peekType(), 'retain', 'Should return retain type for second operation');
        iter5.next(); // consume second operation
        assert.strictEqual(iter5.peekType(), 'delete', 'Should return delete type for third operation');
        iter5.next(); // consume third operation
        assert.strictEqual(iter5.peekType(), 'retain', 'Should return retain type when no more operations');
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_142.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_142.js:1:13)
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