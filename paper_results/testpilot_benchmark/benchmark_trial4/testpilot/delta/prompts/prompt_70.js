The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next', function(done) {
        // Test 1: next() without length parameter (should use Infinity)
        let ops1 = [{ insert: 'hello' }, { retain: 5 }];
        let iterator1 = new quill_delta.OpIterator(ops1);
        let result1 = iterator1.next();
        assert.deepEqual(result1, { insert: 'hello' });
        
        // Test 2: next() with specific length on insert operation
        let ops2 = [{ insert: 'hello world' }];
        let iterator2 = new quill_delta.OpIterator(ops2);
        let result2 = iterator2.next(5);
        assert.deepEqual(result2, { insert: 'hello' });
        
        // Test 3: next() with length greater than remaining operation length
        let ops3 = [{ insert: 'hi' }];
        let iterator3 = new quill_delta.OpIterator(ops3);
        let result3 = iterator3.next(10);
        assert.deepEqual(result3, { insert: 'hi' });
        
        // Test 4: next() on retain operation
        let ops4 = [{ retain: 10 }];
        let iterator4 = new quill_delta.OpIterator(ops4);
        let result4 = iterator4.next(5);
        assert.deepEqual(result4, { retain: 5 });
        
        // Test 5: next() on delete operation
        let ops5 = [{ delete: 8 }];
        let iterator5 = new quill_delta.OpIterator(ops5);
        let result5 = iterator5.next(3);
        assert.deepEqual(result5, { delete: 3 });
        
        // Test 6: next() with attributes
        let ops6 = [{ insert: 'text', attributes: { bold: true } }];
        let iterator6 = new quill_delta.OpIterator(ops6);
        let result6 = iterator6.next(2);
        assert.deepEqual(result6, { insert: 'te', attributes: { bold: true } });
        
        // Test 7: next() when no more operations (should return retain: Infinity)
        let ops7 = [{ insert: 'done' }];
        let iterator7 = new quill_delta.OpIterator(ops7);
        iterator7.next(); // consume the operation
        let result7 = iterator7.next();
        assert.deepEqual(result7, { retain: Infinity });
        
        // Test 8: next() with object retain (embed)
        let ops8 = [{ retain: { image: 'url' } }];
        let iterator8 = new quill_delta.OpIterator(ops8);
        let result8 = iterator8.next(1);
        assert.deepEqual(result8, { retain: { image: 'url' } });
        
        // Test 9: next() with object insert (embed)
        let ops9 = [{ insert: { image: 'url' } }];
        let iterator9 = new quill_delta.OpIterator(ops9);
        let result9 = iterator9.next(1);
        assert.deepEqual(result9, { insert: { image: 'url' } });
        
        // Test 10: Multiple next() calls on same operation
        let ops10 = [{ insert: 'testing' }];
        let iterator10 = new quill_delta.OpIterator(ops10);
        let result10a = iterator10.next(3);
        let result10b = iterator10.next(4);
        assert.deepEqual(result10a, { insert: 'tes' });
        assert.deepEqual(result10b, { insert: 'ting' });
        
        done();
    });
});
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_121.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_121.js:1:13)
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