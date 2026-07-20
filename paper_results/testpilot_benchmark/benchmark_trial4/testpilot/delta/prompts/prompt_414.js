The test:
```
let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - basic functionality', function(done) {
        const delta = new Delta()
            .insert('Hello\n\n')
            .insert('World')
            .insert({ image: 'octocat.png' })
            .insert('\n', { align: 'right' })
            .insert('!');

        const results = [];
        delta.eachLine((line, attributes, i) => {
            results.push({ line, attributes, index: i });
        });

        assert.equal(results.length, 4);
        
        // Line 0: "Hello"
        assert.deepEqual(results[0].line.ops, [{ insert: 'Hello' }]);
        assert.deepEqual(results[0].attributes, {});
        assert.equal(results[0].index, 0);
        
        // Line 1: empty line
        assert.deepEqual(results[1].line.ops, []);
        assert.deepEqual(results[1].attributes, {});
        assert.equal(results[1].index, 1);
        
        // Line 2: "World" + image with align attribute
        assert.deepEqual(results[2].line.ops, [
            { insert: 'World' }, 
            { insert: { image: 'octocat.png' } }
        ]);
        assert.deepEqual(results[2].attributes, { align: 'right' });
        assert.equal(results[2].index, 2);
        
        // Line 3: "!"
        assert.deepEqual(results[3].line.ops, [{ insert: '!' }]);
        assert.deepEqual(results[3].attributes, {});
        assert.equal(results[3].index, 3);
        
        done();
    });

    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_641.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_641.js:1:13)
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