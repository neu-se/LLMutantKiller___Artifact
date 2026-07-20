The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - non-existent event type', function(done) {
        let db = dirty();
        let callCount = 0;
        
        function testListener() {
            callCount++;
        }
        
        // Add listener for one event type
        db.on('test-event', testListener);
        
        // Try to remove listener from different event type
        db.removeListener('other-event', testListener);
        
        // Emit original event to verify listener still works
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_191.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.