The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');
        
        // Verify both listeners were called
        setTimeout(() => {
            assert.strictEqual(firstListenerCalled, true);
            assert.strictEqual(secondListenerCalled, true);
            
            // Reset flags and emit again to verify listeners don't fire again
            firstListenerCalled = false;
            secondListenerCalled = false;
            
            db.em    })
})
``` 
failed with the following error message:
```
firstListenerCalled is not defined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.