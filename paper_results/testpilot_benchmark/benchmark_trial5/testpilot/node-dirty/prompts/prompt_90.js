The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - basic functionality', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        let callCount = 0;
        
        // Add a listener that should only be called once
        db.once('test-event', function(data) {
            callCount++;
            assert.equal(data, 'test-data');
            assert.equal(callCount, 1);
        });
        
        // Emit the event multiple times
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_148.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.