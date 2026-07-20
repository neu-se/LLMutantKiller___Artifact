The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict restores previous global Q if it existed', function(done) {
        // Simulate a previous global Q
        let previousQ = { fake: 'previous Q library' };
        global.Q = previousQ;
        
        // Require q again to simulate it overriding global.Q
        delete require.cache[require.resolve('q')];
        let qModule = require('q');
        
        // Call noConflict
        let returnedQ = qModule.noConflict();
        
        // Verify that global.Q is restored to the previous value
        assert.strictEqual(global.Q, previousQ);
        assert.strictEqual(returnedQ, qModule);
        
        // Clean up
        delete global.Q;
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Cannot find module 'q'
Require stack:
- /path/to/test/test_618.js  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.