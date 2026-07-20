The test:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with abort', function(done) {
        let mapCallCount = 0;
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const asyncMap = pull_stream.asyncMap((value, callback) => {
            mapCallCount++;
            setTimeout(() => callback(null, value * 2), 10);
        });
        
        const abortingRead = (function() {
            let count = 0;
            return function(end, cb) {
                if (end) return cb(end);
                count++;
                if (count <= 2) {
                    source(end, cb);
                } else {
                    // Abort after reading 2 items
                    cb(new Error('Aborted'));
                }
            };
        })();
        
        const sink = pull_stream.collect((err, results) => {
            assert(err instanceof Error);
            assert.strictEqual(err.message, 'Aborted');
            // Should have processed at least some items before abort
            assert(mapCallCount >= 1);
            done();
        });
        
        pull_stream(abortingRead, asyncMap, sink);
    });

    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_206.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_206.js:1:13)
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