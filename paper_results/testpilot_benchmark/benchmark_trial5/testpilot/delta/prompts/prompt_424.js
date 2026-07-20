The test:
```
let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert', function(done) {
        // Test 1: Basic insert, retain with attributes, and delete operations
        const base1 = new Delta().insert('Hello\n').insert('World');
        const delta1 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const inverted1 = delta1.invert(base1);
        
        // Verify the inverted delta has correct operations
        assert.equal(inverted1.ops.length, 3);
        assert.deepEqual(inverted1.ops[0], { retain: 6, attributes: { bold: null } });
        assert.deepEqual(inverted1.ops[1], { insert: 'World' });
        assert.deepEqual(inverted1.ops[2], { delete: 1 });
        
        // Verify that base.compose(delta).compose(inverted) === base
        const result1 = base1.compose(delta1).compose(inverted1);
        assert.deepEqual(result1, base1);

        // Test 2: Simple insert operation
        const base2 = new Delta().insert('Hello');
        const delta2 = new Delta().insert('Hi ').retain(5);
        const inverted2 = delta2.invert(base2);
        
        assert.equal(inverted2.ops.length, 2);
        assert.deepEqual(inverted2.ops[0], { delete: 3 });
        assert.deepEqual(inverted2.ops[1], { retain: 5 });
        
        const result2 = base2.compose(delta2).compose(inverted2);
        assert.deepEqual(result2, base2);

        // Test 3: Simple delete operation
        const base3 = new Delta().insert('Hello World');
        const delta3 = new Delta().retain(5).delete(6);
        const inverted3 = delta3.invert(base3);
        
        assert.equal(inverted3.ops.length, 2);
        assert.deepEqual(inverted3.ops[0], { retain: 5 });
        assert.deepEqual(inverted3.ops[1], { insert: ' World' });
        
        const result3 = base3.compose(delta3).compose(inverted3);
        assert.deepEqual(result3, base3);

        // Test 4: Retain with attributes only
        const base4 = new Delta().insert('Hello', { italic: true });
        const delta4 = new Delta().retain(5, { bold: true });
        const inverted4 = delta4.invert(base4);
        
        assert.equal(inverted4.ops.length, 1);
        assert.deepEqual(inverted4.ops[0], { retain: 5, attributes: { bold: null } });
        
        const result4 = base4.compose(delta4).compose(inverted4);
        assert.deepEqual(result4, base4);

        // Test 5: Empty delta
        const base5 = new Delta().insert('Hello');
        const delta5 = new Delta();
        const inverted5 = delta5.invert(base5);
        
        assert.equal(inverted5.ops.length, 0);
        
        const result5 = base5.compose(delta5).compose(inverted5);
        assert.deepEqual(result5, base5);

        // Test 6: Complex mixed operations
        const base6 = new Delta().insert('The quick brown fox');
        const delta6 = new Delta()
            .retain(4, { bold: true })
            .insert('slow ')
            .delete(5)
            .retain(6)
            .insert(' jumps');
        const inverted6 = delta6.invert(base6);
        
        const result6 = base6.compose(delta6).compose(inverted6);
        assert.deepEqual(result6, base6);

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_662.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_662.js:1:13)
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