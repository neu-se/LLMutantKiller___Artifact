The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test delete operation
        let deleteOps = [{ delete: 5 }];
        let deleteIterator = new quill_delta.OpIterator(deleteOps);
        assert.equal(deleteIterator.peekType(), 'delete');

        // Test retain operation with number
        let retainOps = [{ retain: 3 }];
        let retainIterator = new quill_delta.OpIterator(retainOps);
        assert.equal(retainIterator.peekType(), 'retain');

        // Test retain operation with object
        let retainObjectOps = [{ retain: { bold: true } }];
        let retainObjectIterator = new quill_delta.OpIterator(retainObjectOps);
        assert.equal(retainObjectIterator.peekType(), 'retain');

        // Test insert operation (string)
        let insertOps = [{ insert: 'hello' }];
        let insertIterator = new quill_delta.OpIterator(insertOps);
        assert.equal(insertIterator.peekType(), 'insert');

        // Test insert operation (object like embed)
        let insertEmbedOps = [{ insert: { image: 'url' } }];
        let insertEmbedIterator = new quill_delta.OpIterator(insertEmbedOps);
        assert.equal(insertEmbedIterator.peekType(), 'insert');

        // Test empty ops array (should return 'retain')
        let emptyOps = [];
        let emptyIterator = new quill_delta.OpIterator(emptyOps);
        assert.equal(emptyIterator.peekType(), 'retain');

        // Test when iterator is at the end (should return 'retain')
        let singleOp = [{ insert: 'test' }];
        let endIterator = new quill_delta.OpIterator(singleOp);
        endIterator.next(); // Move past the only operation
        assert.equal(endIterator.peekType(), 'retain');

        // Test retain with null (should be 'insert' since retain must be number or non-null object)
        let retainNullOps = [{ retain: null }];
        let retainNullIterator = new quill_delta.OpIterator(retainNullOps);
        assert.equal(retainNullIterator.peekType(), 'insert');

        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_143.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_143.js:1:13)
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