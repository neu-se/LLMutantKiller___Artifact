The test:
```
let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic composition with retain, insert, and delete
        const delta1 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change1 = new Delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        const result1 = delta1.compose(change1);
        const expected1 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(result1.ops, expected1.ops);

        // Test 2: Simple insert composition
        const a2 = new Delta().insert('Hello');
        const b2 = new Delta().retain(5).insert('!');
        const result2 = a2.compose(b2);
        const expected2 = new Delta().insert('Hello!');
        assert.deepEqual(result2.ops, expected2.ops);

        // Test 3: Delete operation
        const a3 = new Delta().insert('abc');
        const b3 = new Delta().retain(1).delete(1);
        const result3 = a3.compose(b3);
        const expected3 = new Delta().insert('ac');
        assert.deepEqual(result3.ops, expected3.ops);

        // Test 4: Attribute modification
        const a4 = new Delta().insert('Hello\n').insert('World');
        const b4 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const result4 = a4.compose(b4);
        const expected4 = new Delta()
            .insert('Hello\n')
            .insert('!', { bold: true });
        assert.deepEqual(result4.ops, expected4.ops);

        // Test 5: Empty delta composition
        const a5 = new Delta().insert('test');
        const b5 = new Delta();
        const result5 = a5.compose(b5);
        assert.deepEqual(result5.ops, a5.ops);

        // Test 6: Multiple operations
        const a6 = new Delta().insert('Hello World');
        const b6 = new Delta()
            .retain(5)
            .delete(1)
            .insert(' Beautiful')
            .retain(5);
        const result6 = a6.compose(b6);
        const expected6 = new Delta().insert('Hello Beautiful World');
        assert.deepEqual(result6.ops, expected6.ops);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_555.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_555.js:1:13)
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