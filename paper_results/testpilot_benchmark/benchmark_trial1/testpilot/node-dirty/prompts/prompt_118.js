The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        // Test 1: Remove a listener that was added
        let callCount = 0;
        function testListener() {
            callCount++;
        }
        
        // Add the listener
        db.on('test-event', testListener);
        
        // Verify listener is added by emitting event
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_183.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.