The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        // Test 1: Basic prepend listener functionality
        let callOrder = [];
        
        // Add a regular listener first
        db.on('test', function() {
            callOrder.push('second');
        });
        
        // Prepend a listener - this should be called first
        db.prependListener('test', function() {
            callOrder.push('first');
        });
        
        // Emit the event
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_134.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.