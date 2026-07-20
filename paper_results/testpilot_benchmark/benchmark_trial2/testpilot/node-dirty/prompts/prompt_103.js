The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - remove non-existent listener', function(done) {
        let db = dirty();
        let callCount = 0;
        
        function testListener() {
            callCount++;
        }
        
        function otherListener() {
            // This listener is not added
        }
        
        // Add one listener
        db.on('test-event', testListener);
        
        // Try to remove a different listener that was never added
        db.removeListener('test-event', otherListener);
        
        // Emit event to verify original listener still works
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_155.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.