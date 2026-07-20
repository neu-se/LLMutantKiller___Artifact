The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert', function(done) {
        // Test 1: Basic attribute inversion
        const attr1 = { bold: true, italic: false };
        const base1 = { bold: false, color: 'red' };
        const inverted1 = quill_delta.AttributeMap.invert(attr1, base1);
        
        // Should invert bold from true to false (base value)
        // Should invert italic from false to undefined (not in base)
        // Should not include color since it wasn't in attr
        assert.deepEqual(inverted1, { bold: false, italic: null });
        
        // Test 2: Empty attributes
        const attr2 = {};
        const base2 = { bold: true, italic: false };
        const inverted2 = quill_delta.AttributeMap.invert(attr2, base2);
        
        // Should return empty object when no attributes to invert
        assert.deepEqual(inverted2, {});
        
        // Test 3: Attributes not in base
        const attr3 = { underline: true, strike: false };
        const base3 = { bold: true };
        const inverted3 = quill_delta.AttributeMap.invert(attr3, base3);
        
        // Should set attributes to null when not present in base
        assert.deepEqual(inverted3, { underline: null, strike: null });
        
        // Test 4: Mixed scenario
        const attr4 = { bold: true, italic: false, underline: true };
        const base4 = { bold: false, italic: true };
        const inverted4 = quill_delta.AttributeMap.invert(attr4, base4);
        
        // Should restore base values for bold and italic, null for underline
        assert.deepEqual(inverted4, { bold: false, italic: true, underline: null });
        
        // Test 5: Default parameters
        const inverted5 = quill_delta.AttributeMap.invert();
        assert.deepEqual(inverted5, {});
        
        // Test 6: Null/undefined values
        const attr6 = { bold: null, italic: undefined };
        const base6 = { bold: true, italic: false };
        const inverted6 = quill_delta.AttributeMap.invert(attr6, base6);
        
        // Should handle null/undefined values appropriately
        assert.deepEqual(inverted6, { bold: true, italic: false });
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_254.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_254.js:1:13)
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