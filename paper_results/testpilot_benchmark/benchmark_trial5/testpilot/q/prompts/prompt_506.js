The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict removes global Q when no previous value existed', function(done) {
        // Ensure no global Q exists initially
        delete global.Q;
        
        // Require q fresh
        delete require.cache[require.resolve('q')];
        let qModule = require('q');
        
        // Call noConflict
        let returnedQ = qModule.noConflict();
        
        // Verify that global.Q is undefined after noConflict
        assert.strictEqual(global.Q, undefined);
        assert.strictEqual(returnedQ, qModule);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Cannot find module 'q'
Require stack:
- /path/to/test/test_619.js  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.