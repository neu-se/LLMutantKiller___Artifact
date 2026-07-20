The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest', function(done) {
        // Test 1: Empty iterator - should return empty array
        let delta1 = new quill_delta([]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        let result1 = iter1.rest();
        assert.deepEqual(result1, []);

        // Test 2: Iterator at beginning with no offset - should return all ops
        let delta2 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        let result2 = iter2.rest();
        assert.deepEqual(result2, [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);

        // Test 3: Iterator after consuming some ops with no offset
        let delta3 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        iter3.next(); // consume first op
        let result3 = iter3.rest();
        assert.deepEqual(result3, [
            { insert: ' ' },
            { insert: 'World' }
        ]);

        // Test 4: Iterator with offset (partial consumption of current op)
        let delta4 = new quill_delta([
            { insert: 'Hello' },
            { insert: 'World' }
        ]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        iter4.next(2); // consume 2 characters from 'Hello'
        let result4 = iter4.rest();
        assert.deepEqual(result4, [
            { insert: 'llo' }, // remaining part of first op
            { insert: 'World' } // second op
        ]);

        // Test 5: Iterator at the end - should return empty array
        let delta5 = new quill_delta([
            { insert: 'Hello' }
        ]);
        let iter5 = new quill_delta.OpIterator(delta5.ops);
        iter5.next(); // consume all ops
        let result5 = iter5.rest();
        assert.deepEqual(result5, []);

        // Test 6: Iterator with different op types
        let delta6 = new quill_delta([
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3 }
        ]);
        let iter6 = new quill_delta.OpIterator(delta6.ops);
        iter6.next(); // consume first op
        let result6 = iter6.rest();
        assert.deepEqual(result6, [
            { delete: 5 },
            { retain: 3 }
        ]);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_147.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_147.js:1:13)
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