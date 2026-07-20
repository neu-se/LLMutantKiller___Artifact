The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let eventOrder = [];
        
        // Add a regular listener first
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        // Add a prependOnceListener - should execute first and only once
        db.prependOnceListener('test-event', function() {
            callCount++;
            eventOrder.push('prepended-once');
        });
        
        // Emit the event multiple times
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_161.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.