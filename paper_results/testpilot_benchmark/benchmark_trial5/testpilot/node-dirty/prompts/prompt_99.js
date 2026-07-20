The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - basic functionality', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        let eventFired = false;
        let eventData = null;
        
        // Test that once() registers a listener that fires only once
        db.once('test-event', function(data) {
            eventFired = true;
            eventData = data;
        });
        
        // Emit the event
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_137.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.