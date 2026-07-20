The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.unregisterEmbed - removes only specified embed type', function(done) {
        // Register multiple embed types
        quill_delta.registerEmbed('embedA', {});
        quill_delta.registerEmbed('embedB', {});
        quill_delta.registerEmbed('embedC', {});
        
        // Verify all are registered
        assert(quill_delta.handlers.hasOwnProperty('embedA'), 'embedA should be registered');
        assert(quill_delta.handlers.hasOwnProperty('embedB'), 'embedB should be registered');
        assert(quill_delta.handlers.hasOwnProperty('embedC'), 'embedC should be registered');
        
        // Unregister only embedB
        quill_delta.unregisterEmbed('embedB');
        
        // Verify only embedB was removed
        assert(quill_delta.handlers.hasOwnProperty('embedA'), 'embedA should still be registered');
        assert(!quill_delta.handlers.hasOwnProperty('embedB'), 'embedB should be unregistered');
        assert(quill_delta.handlers.hasOwnProperty('embedC'), 'embedC should still be registered');
        
        // Clean up
        quill_delta.unregisterEmbed('embedA');
        quill_delta.unregisterEmbed('embedC');
        
        done();
    });

    })
``` 
failed with the following error message:
```

Error: Cannot find module 'mocha'
Require stack:
- /path/to/test/test_751.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1224:15)
    at Module._load (node:internal/modules/cjs/loader:1050:27)
    at Module.require (node:internal/modules/cjs/loader:1310:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/path/to/test/test_751.js:1:13)
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