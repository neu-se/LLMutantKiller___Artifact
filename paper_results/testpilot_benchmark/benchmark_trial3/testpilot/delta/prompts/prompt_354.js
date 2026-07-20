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
        const a = new Delta().insert('Hello');
        const b = new Delta().insert('Hello!');
        const diff = a.diff(b);
        const composed = a.compose(diff);
        assert.deepEqual(composed.ops, b.ops);

        // Test 3: Retain and delete composition
        const base = new Delta().insert('abc');
        const change = new Delta().retain(1).delete(1);
        const result3 = base.compose(change);
        const expected3 = new Delta().insert('ac');
        assert.deepEqual(result3.ops, expected3.ops);

        // Test 4: Complex composition with attributes and operations
        const base4 = new Delta().insert('Hello\n').insert('World');
        const delta4 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const result4 = base4.compose(delta4);
        const expected4 = new Delta()
            .insert('Hello\n')
            .insert('!', { bold: true });
        assert.deepEqual(result4.ops, expected4.ops);

        // Test 5: Empty delta composition
        const empty = new Delta();
        const text = new Delta().insert('test');
        const result5 = empty.compose(text);
        assert.deepEqual(result5.ops, text.ops);

        // Test 6: Composition with only retains
        const base6 = new Delta().insert('Hello World');
        const change6 = new Delta().retain(5, { bold: true }).retain(6);
        const result6 = base6.compose(change6);
        const expected6 = new Delta()
            .insert('Hello', { bold: true })
            .insert(' World');
        assert.deepEqual(result6.ops, expected6.ops);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_545.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_545.js:1:13)
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