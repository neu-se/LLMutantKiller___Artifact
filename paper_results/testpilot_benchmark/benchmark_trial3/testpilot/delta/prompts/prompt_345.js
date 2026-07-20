The test:
```
let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose', function(done) {
        // Test 1: Basic text insertion composition
        const a = new Delta().insert('Hello');
        const b = new Delta().retain(5).insert('!');
        const composed = a.compose(b);
        const expected = new Delta().insert('Hello!');
        assert.deepEqual(composed.ops, expected.ops, 'Basic insertion should work');

        // Test 2: Insert and delete composition
        const c = new Delta().insert('abc');
        const d = new Delta().retain(1).delete(1);
        const composed2 = c.compose(d);
        const expected2 = new Delta().insert('ac');
        assert.deepEqual(composed2.ops, expected2.ops, 'Insert and delete should work');

        // Test 3: Composition with attributes
        const base = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#ccc' } }
        ]);
        const change = new Delta().retain(12).insert('White', { color: '#fff' }).delete(4);
        const composed3 = base.compose(change);
        const expected3 = new Delta([
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the White', attributes: { color: '#fff' } }
        ]);
        assert.deepEqual(composed3.ops, expected3.ops, 'Composition with attributes should work');

        // Test 4: Retain with attributes
        const e = new Delta().insert('Hello\nWorld');
        const f = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const composed4 = e.compose(f);
        const expected4 = new Delta().insert('Hello\n', { bold: true }).insert('!');
        assert.deepEqual(composed4.ops, expected4.ops, 'Retain with attributes should work');

        // Test 5: Empty delta composition
        const empty1 = new Delta();
        const empty2 = new Delta();
        const composed5 = empty1.compose(empty2);
        assert.deepEqual(composed5.ops, [], 'Empty deltas should compose to empty');

        // Test 6: Only retains
        const g = new Delta().insert('test');
        const h = new Delta().retain(4);
        const composed6 = g.compose(h);
        const expected6 = new Delta().insert('test');
        assert.deepEqual(composed6.ops, expected6.ops, 'Retain-only composition should preserve original');

        // Test 7: Multiple operations
        const i = new Delta().insert('Hello World');
        const j = new Delta().retain(5).delete(1).insert(' Beautiful').retain(5);
        const composed7 = i.compose(j);
        const expected7 = new Delta().insert('Hello Beautiful World');
        assert.deepEqual(composed7.ops, expected7.ops, 'Multiple operations should compose correctly');

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_536.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_536.js:1:13)
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